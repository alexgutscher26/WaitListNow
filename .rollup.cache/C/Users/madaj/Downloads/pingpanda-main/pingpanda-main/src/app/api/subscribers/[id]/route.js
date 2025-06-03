import { __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';
var updateSubscriberSchema = z.object({
    status: z.enum(['PENDING', 'VERIFIED', 'APPROVED', 'REJECTED']).optional(),
});
export function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, body, validation, status_1, subscriber, updatedSubscriber, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _c.sent();
                    validation = updateSubscriberSchema.safeParse(body);
                    if (!validation.success) {
                        return [2 /*return*/, new NextResponse(JSON.stringify({ error: 'Invalid request body', details: validation.error.issues }), { status: 400, headers: { 'Content-Type': 'application/json' } })];
                    }
                    status_1 = validation.data.status;
                    return [4 /*yield*/, db.subscriber.findUnique({
                            where: { id: params.id },
                            include: {
                                waitlist: {
                                    include: {
                                        user: true,
                                    },
                                },
                            },
                        })];
                case 2:
                    subscriber = _c.sent();
                    if (!subscriber) {
                        return [2 /*return*/, new NextResponse('Subscriber not found', { status: 404 })];
                    }
                    // Verify the user owns the waitlist
                    if (subscriber.waitlist.user.externalId !== userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 403 })];
                    }
                    return [4 /*yield*/, db.subscriber.update({
                            where: { id: params.id },
                            data: {
                                status: status_1,
                            },
                        })];
                case 3:
                    updatedSubscriber = _c.sent();
                    return [2 /*return*/, new NextResponse(JSON.stringify(updatedSubscriber), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 4:
                    error_1 = _c.sent();
                    console.error('[SUBSCRIBER_UPDATE]', error_1);
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? error_1 : undefined,
                        }), { status: 500, headers: { 'Content-Type': 'application/json' } })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, subscriber, user, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, db.subscriber.findUnique({
                            where: { id: params.id },
                            include: {
                                waitlist: true,
                            },
                        })];
                case 1:
                    subscriber = _c.sent();
                    if (!subscriber) {
                        return [2 /*return*/, new NextResponse('Subscriber not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 2:
                    user = _c.sent();
                    if (!user || subscriber.waitlist.userId !== user.id) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 403 })];
                    }
                    // Delete the subscriber
                    return [4 /*yield*/, db.subscriber.delete({
                            where: { id: params.id },
                        })];
                case 3:
                    // Delete the subscriber
                    _c.sent();
                    // Update the waitlist subscriber count
                    return [4 /*yield*/, db.waitlist.update({
                            where: { id: subscriber.waitlistId },
                            data: {
                                subscriberCount: {
                                    decrement: 1,
                                },
                            },
                        })];
                case 4:
                    // Update the waitlist subscriber count
                    _c.sent();
                    return [2 /*return*/, new NextResponse(null, { status: 204 })];
                case 5:
                    error_2 = _c.sent();
                    console.error('[SUBSCRIBER_DELETE]', error_2);
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? error_2 : undefined,
                        }), { status: 500, headers: { 'Content-Type': 'application/json' } })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map