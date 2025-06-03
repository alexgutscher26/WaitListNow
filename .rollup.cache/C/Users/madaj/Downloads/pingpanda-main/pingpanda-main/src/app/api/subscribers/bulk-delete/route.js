import { __awaiter, __generator, __spreadArray } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, ids, subscribers, waitlistUpdates, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
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
                    return [4 /*yield*/, req.json()];
                case 2:
                    ids = (_a.sent()).ids;
                    if (!Array.isArray(ids) || ids.length === 0) {
                        return [2 /*return*/, new NextResponse('No subscriber IDs provided', { status: 400 })];
                    }
                    return [4 /*yield*/, db.subscriber.findMany({
                            where: {
                                id: { in: ids },
                                waitlist: {
                                    userId: user.id,
                                },
                            },
                            include: {
                                waitlist: true,
                            },
                        })];
                case 3:
                    subscribers = _a.sent();
                    if (subscribers.length === 0) {
                        return [2 /*return*/, new NextResponse('No valid subscribers found', { status: 404 })];
                    }
                    waitlistUpdates = subscribers.reduce(function (acc, subscriber) {
                        if (!acc[subscriber.waitlistId]) {
                            acc[subscriber.waitlistId] = 0;
                        }
                        acc[subscriber.waitlistId]++;
                        return acc;
                    }, {});
                    // Delete subscribers in a transaction
                    return [4 /*yield*/, db.$transaction(__spreadArray([
                            // Delete the subscribers
                            db.subscriber.deleteMany({
                                where: {
                                    id: { in: subscribers.map(function (s) { return s.id; }) },
                                },
                            })
                        ], Object.entries(waitlistUpdates).map(function (_a) {
                            var waitlistId = _a[0], count = _a[1];
                            return db.waitlist.update({
                                where: { id: waitlistId },
                                data: {
                                    subscriberCount: {
                                        decrement: count,
                                    },
                                },
                            });
                        }), true))];
                case 4:
                    // Delete subscribers in a transaction
                    _a.sent();
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            success: true,
                            deletedCount: subscribers.length,
                        }), { status: 200, headers: { 'Content-Type': 'application/json' } })];
                case 5:
                    error_1 = _a.sent();
                    console.error('[SUBSCRIBERS_BULK_DELETE]', error_1);
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? error_1 : undefined,
                        }), { status: 500, headers: { 'Content-Type': 'application/json' } })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map