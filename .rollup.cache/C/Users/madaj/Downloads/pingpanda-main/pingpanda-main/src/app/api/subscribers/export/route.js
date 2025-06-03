import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { format } from 'date-fns';
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, _a, waitlistId, subscriberIds, waitlist, whereClause, subscribers, headers, csvRows, _i, subscribers_1, sub, row, csvContent, filename, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, req.json()];
                case 2:
                    _a = _b.sent(), waitlistId = _a.waitlistId, subscriberIds = _a.subscriberIds;
                    if (!waitlistId) {
                        return [2 /*return*/, new NextResponse('Waitlist ID is required', { status: 400 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                userId: user.id,
                            },
                        })];
                case 3:
                    waitlist = _b.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    whereClause = __assign({ waitlistId: waitlistId }, ((subscriberIds === null || subscriberIds === void 0 ? void 0 : subscriberIds.length) > 0 && { id: { in: subscriberIds } }));
                    return [4 /*yield*/, db.subscriber.findMany({
                            where: whereClause,
                            orderBy: { createdAt: 'desc' },
                        })];
                case 4:
                    subscribers = _b.sent();
                    headers = ['Email', 'Name', 'Status', 'Referral Code', 'Referred By', 'Joined At'];
                    csvRows = [];
                    csvRows.push(headers.join(','));
                    for (_i = 0, subscribers_1 = subscribers; _i < subscribers_1.length; _i++) {
                        sub = subscribers_1[_i];
                        row = [
                            "\"".concat(sub.email, "\""),
                            "\"".concat(sub.name || '', "\""),
                            "\"".concat(sub.status, "\""),
                            "\"".concat(sub.referralCode || '', "\""),
                            "\"".concat(sub.referredBy || '', "\""),
                            "\"".concat(format(new Date(sub.createdAt), 'yyyy-MM-dd HH:mm:ss'), "\""),
                        ];
                        csvRows.push(row.join(','));
                    }
                    csvContent = csvRows.join('\n');
                    filename = "subscribers-".concat(waitlist.slug, "-").concat(format(new Date(), 'yyyy-MM-dd'), ".csv");
                    // Return the CSV file
                    return [2 /*return*/, new NextResponse(csvContent, {
                            headers: {
                                'Content-Type': 'text/csv',
                                'Content-Disposition': "attachment; filename=\"".concat(filename, "\""),
                            },
                        })];
                case 5:
                    error_1 = _b.sent();
                    console.error('[SUBSCRIBERS_EXPORT]', error_1);
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