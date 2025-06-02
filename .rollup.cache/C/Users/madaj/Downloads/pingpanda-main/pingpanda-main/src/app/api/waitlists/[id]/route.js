import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { NextResponse } from 'next/server';
// Lazy load Clerk's getAuth function
var _getAuth;
var getAuth = function (req) {
    if (!_getAuth) {
        try {
            // This will be evaluated at runtime
            _getAuth = require('@clerk/nextjs/server').getAuth;
        }
        catch (error) {
            console.error('Failed to load Clerk:', error);
            // Fallback mock for development
            _getAuth = function () { return ({ userId: process.env.NODE_ENV === 'development' ? 'dev-user' : null }); };
        }
    }
    return _getAuth(req);
};
import { db } from '@/lib/db';
import { waitlistFormSchema } from '@/lib/validations/waitlist';
import { z } from 'zod';
// Enable debug logging in development
var isDev = process.env.NODE_ENV === 'development';
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return isDev && console.log.apply(console, __spreadArray(['[Waitlist API]'], args, false));
};
// GET /api/waitlists/[id] - Get a specific waitlist
export function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, waitlistId, user, waitlist, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    waitlistId = params.id;
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                userId: user.id, // Ensure the waitlist belongs to the authenticated user
                            },
                            include: {
                                _count: {
                                    select: {
                                        subscribers: true,
                                    },
                                },
                            },
                        })];
                case 2:
                    waitlist = _c.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    return [2 /*return*/, NextResponse.json(waitlist)];
                case 3:
                    error_1 = _c.sent();
                    console.error('[WAITLISTS_GET_ONE]', error_1);
                    log('Error details:', error_1);
                    if (error_1 instanceof Error) {
                        log('Error stack:', error_1.stack);
                        return [2 /*return*/, new NextResponse(JSON.stringify({
                                error: error_1.message,
                                stack: isDev ? error_1.stack : undefined,
                            }), {
                                status: 500,
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    }
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: isDev ? String(error_1) : undefined,
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// PATCH /api/waitlists/[id] - Partially update a waitlist
export function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var params = _b.params;
        return __generator(this, function (_c) {
            return [2 /*return*/, handleUpdateWaitlist(req, params.id, false)];
        });
    });
}
// PUT /api/waitlists/[id] - Replace a waitlist (full update)
export function PUT(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var params = _b.params;
        return __generator(this, function (_c) {
            return [2 /*return*/, handleUpdateWaitlist(req, params.id, true)];
        });
    });
}
// DELETE /api/waitlists/[id] - Delete a waitlist
export function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, waitlistId, user, existingWaitlist, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    waitlistId = params.id;
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                userId: user.id,
                            },
                        })];
                case 2:
                    existingWaitlist = _c.sent();
                    if (!existingWaitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    // Use a transaction to ensure data consistency
                    return [4 /*yield*/, db.$transaction([
                            // First delete all related subscribers
                            db.subscriber.deleteMany({
                                where: { waitlistId: waitlistId },
                            }),
                            // Then delete the waitlist
                            db.waitlist.delete({
                                where: { id: waitlistId },
                            }),
                        ])];
                case 3:
                    // Use a transaction to ensure data consistency
                    _c.sent();
                    // Return 204 No Content on successful deletion
                    return [2 /*return*/, new NextResponse(null, { status: 204 })];
                case 4:
                    error_2 = _c.sent();
                    console.error('[WAITLISTS_DELETE]', error_2);
                    // Log the error details, including the stack trace, for debugging purposes
                    if (error_2 instanceof Error) {
                        console.error('Error details:', error_2.message, error_2.stack);
                    }
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Shared handler for both PUT and PATCH
function handleUpdateWaitlist(req, waitlistId, isFullUpdate) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, existingWaitlist, json, updateData, updatedData, body, slug, slugInUse, updatedWaitlist, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                userId: user.id,
                            },
                        })];
                case 2:
                    existingWaitlist = _a.sent();
                    if (!existingWaitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    return [4 /*yield*/, req.json()];
                case 3:
                    json = _a.sent();
                    updateData = isFullUpdate ? json : __assign({}, json);
                    updatedData = {};
                    // Only validate and include fields that were actually provided in the request
                    if (updateData.status !== undefined) {
                        updatedData.status = updateData.status;
                    }
                    // If this is a full update (PUT), validate all required fields
                    if (isFullUpdate) {
                        body = waitlistFormSchema.parse(updateData);
                        Object.assign(updatedData, body);
                    }
                    else if (updateData.name !== undefined) {
                        updatedData.name = updateData.name;
                    }
                    if (!(updatedData.name && updatedData.name !== existingWaitlist.name)) return [3 /*break*/, 5];
                    slug = updatedData.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                slug: slug,
                                userId: user.id,
                                id: { not: waitlistId },
                            },
                        })];
                case 4:
                    slugInUse = _a.sent();
                    if (slugInUse) {
                        return [2 /*return*/, new NextResponse('You already have a waitlist with this name', {
                                status: 400,
                            })];
                    }
                    updatedData.slug = slug;
                    _a.label = 5;
                case 5: return [4 /*yield*/, db.waitlist.update({
                        where: { id: waitlistId },
                        data: updateData,
                        include: {
                            _count: {
                                select: {
                                    subscribers: true,
                                },
                            },
                        },
                    })];
                case 6:
                    updatedWaitlist = _a.sent();
                    return [2 /*return*/, NextResponse.json(updatedWaitlist)];
                case 7:
                    error_3 = _a.sent();
                    console.error('[WAITLISTS_UPDATE]', error_3);
                    // Log the full error in development
                    if (isDev) {
                        console.error('Full error details:', {
                            message: error_3 instanceof Error ? error_3.message : 'Unknown error',
                            stack: error_3 instanceof Error ? error_3.stack : undefined,
                            error: error_3,
                        });
                    }
                    if (error_3 instanceof z.ZodError) {
                        return [2 /*return*/, new NextResponse(JSON.stringify({
                                error: 'Validation error',
                                details: error_3.errors,
                            }), {
                                status: 400,
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    }
                    if (error_3 instanceof Error) {
                        return [2 /*return*/, new NextResponse(JSON.stringify({
                                error: error_3.message,
                            }), {
                                status: 500,
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    }
                    // Log the error details on the server
                    console.error('[WAITLISTS_UPDATE] Internal server error:', {
                        message: error_3 instanceof Error ? error_3.message : 'Unknown error',
                        stack: error_3 instanceof Error ? error_3.stack : undefined,
                        error: error_3,
                    });
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map