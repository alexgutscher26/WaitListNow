import { __awaiter, __generator, __spreadArray } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';
function getWaitlistSettings(settings) {
    if (typeof settings !== 'object' || settings === null) {
        return {};
    }
    return settings;
}
// Validation schema for subscriber data
var subscriberSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().optional(),
});
// Enable debug logging in development
var isDev = process.env.NODE_ENV === 'development';
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return isDev && console.log.apply(console, __spreadArray(['[Waitlist Subscribers API]'], args, false));
};
// GET /api/waitlists/[id]/subscribers - Get subscribers for a specific waitlist
// POST /api/waitlists/[id]/subscribers - Add a new subscriber to a waitlist
export function POST(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var waitlistId, json, body, waitlist, settings, allowDuplicates, existingSubscriber, subscriber, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    waitlistId = params.id;
                    return [4 /*yield*/, req.json()];
                case 1:
                    json = _c.sent();
                    body = subscriberSchema.parse(json);
                    return [4 /*yield*/, db.waitlist.findUnique({
                            where: {
                                id: waitlistId,
                                status: 'ACTIVE',
                            },
                        })];
                case 2:
                    waitlist = _c.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found or not active', { status: 404 })];
                    }
                    settings = getWaitlistSettings(waitlist.settings);
                    allowDuplicates = settings.allowDuplicates === true;
                    if (!!allowDuplicates) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.subscriber.findFirst({
                            where: {
                                email: body.email,
                                waitlistId: waitlistId,
                            },
                        })];
                case 3:
                    existingSubscriber = _c.sent();
                    if (existingSubscriber) {
                        return [2 /*return*/, new NextResponse('Email already subscribed to this waitlist', { status: 400 })];
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, db.subscriber.create({
                        data: {
                            email: body.email,
                            name: body.name || null,
                            waitlistId: waitlistId,
                            userId: waitlist.userId, // Link to the waitlist owner
                            status: 'PENDING',
                        },
                    })];
                case 5:
                    subscriber = _c.sent();
                    // Increment the waitlist's subscriber count
                    return [4 /*yield*/, db.waitlist.update({
                            where: { id: waitlistId },
                            data: {
                                subscriberCount: {
                                    increment: 1,
                                },
                            },
                        })];
                case 6:
                    // Increment the waitlist's subscriber count
                    _c.sent();
                    return [2 /*return*/, NextResponse.json(subscriber)];
                case 7:
                    error_1 = _c.sent();
                    console.error('[WAITLIST_SUBSCRIBER_POST]', error_1);
                    if (error_1 instanceof z.ZodError) {
                        return [2 /*return*/, new NextResponse(JSON.stringify({ errors: error_1.errors }), {
                                status: 422,
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    }
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? error_1 : undefined,
                        }), { status: 500, headers: { 'Content-Type': 'application/json' } })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, searchParams, page, limit, status_1, search, waitlistId, user, waitlist, whereClause, total, totalPages, skip, subscribers, response, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    searchParams = new URL(req.url).searchParams;
                    page = parseInt(searchParams.get('page') || '1');
                    limit = parseInt(searchParams.get('limit') || '20');
                    status_1 = searchParams.get('status');
                    search = searchParams.get('search') || '';
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
                    waitlist = _c.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    whereClause = {
                        waitlistId: waitlistId,
                    };
                    // Add status filter if provided
                    if (status_1 && status_1 !== 'ALL') {
                        whereClause.status = status_1;
                    }
                    // Add search filter if provided
                    if (search) {
                        whereClause.OR = [
                            { email: { contains: search, mode: 'insensitive' } },
                            { name: { contains: search, mode: 'insensitive' } },
                        ];
                    }
                    return [4 /*yield*/, db.subscriber.count({
                            where: whereClause,
                        })];
                case 3:
                    total = _c.sent();
                    totalPages = Math.ceil(total / limit);
                    skip = (page - 1) * limit;
                    return [4 /*yield*/, db.subscriber.findMany({
                            where: whereClause,
                            skip: skip,
                            take: limit,
                            orderBy: {
                                createdAt: 'desc',
                            },
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                status: true,
                                referralCode: true,
                                referredBy: true,
                                customFields: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        })];
                case 4:
                    subscribers = _c.sent();
                    response = {
                        data: subscribers,
                        pagination: {
                            total: total,
                            totalPages: totalPages,
                            currentPage: page,
                            limit: limit,
                            hasNextPage: page < totalPages,
                            hasPreviousPage: page > 1,
                        },
                    };
                    return [2 /*return*/, NextResponse.json(response)];
                case 5:
                    error_2 = _c.sent();
                    console.error('[WAITLISTS_GET_SUBSCRIBERS]', error_2);
                    log('Error details:', error_2);
                    if (error_2 instanceof Error) {
                        log('Error stack:', error_2.stack);
                        return [2 /*return*/, new NextResponse(JSON.stringify({
                                error: 'Internal server error',
                            }), {
                                status: 500,
                                headers: { 'Content-Type': 'application/json' },
                            })];
                    }
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map