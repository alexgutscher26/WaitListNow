import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
export function GET(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var id, userId, dbUser, waitlist, searchParams, days, endDate, startDate, dailyCounts, initialCount, dateMap_1, currentDate, dateStr, runningTotal, result, sortedDates, _i, sortedDates_1, _c, date, count, error_1;
        var params = _b.params;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    id = params.id;
                    return [4 /*yield*/, auth()];
                case 1:
                    userId = (_d.sent()).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 2:
                    dbUser = _d.sent();
                    if (!dbUser) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: id,
                                userId: dbUser.id,
                            },
                        })];
                case 3:
                    waitlist = _d.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    searchParams = new URL(request.url).searchParams;
                    days = Math.min(Number(searchParams.get('days')) || 30, 365);
                    endDate = new Date();
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - days);
                    return [4 /*yield*/, db.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT \n        DATE_TRUNC('day', \"createdAt\") as date,\n        COUNT(*)::bigint as count\n      FROM \"Subscriber\"\n      WHERE \n        \"waitlistId\" = ", "\n        AND \"createdAt\" >= ", "\n        AND \"createdAt\" <= ", "\n      GROUP BY DATE_TRUNC('day', \"createdAt\")\n      ORDER BY date ASC\n    "], ["\n      SELECT \n        DATE_TRUNC('day', \"createdAt\") as date,\n        COUNT(*)::bigint as count\n      FROM \"Subscriber\"\n      WHERE \n        \"waitlistId\" = ", "\n        AND \"createdAt\" >= ", "\n        AND \"createdAt\" <= ", "\n      GROUP BY DATE_TRUNC('day', \"createdAt\")\n      ORDER BY date ASC\n    "])), id, startDate, endDate)];
                case 4:
                    dailyCounts = _d.sent();
                    return [4 /*yield*/, db.subscriber.count({
                            where: {
                                waitlistId: id,
                                createdAt: { lt: startDate },
                            },
                        })];
                case 5:
                    initialCount = _d.sent();
                    dateMap_1 = new Map();
                    currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        dateStr = currentDate.toISOString().split('T')[0];
                        dateMap_1.set(dateStr, 0);
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                    // Fill in the actual counts
                    dailyCounts.forEach(function (item) {
                        var dateStr = new Date(item.date).toISOString().split('T')[0];
                        dateMap_1.set(dateStr, Number(item.count));
                    });
                    runningTotal = initialCount;
                    result = [];
                    sortedDates = Array.from(dateMap_1.entries()).sort(function (a, b) { return new Date(a[0]).getTime() - new Date(b[0]).getTime(); });
                    for (_i = 0, sortedDates_1 = sortedDates; _i < sortedDates_1.length; _i++) {
                        _c = sortedDates_1[_i], date = _c[0], count = _c[1];
                        runningTotal += count;
                        result.push({
                            date: date,
                            count: count,
                            cumulative: runningTotal,
                        });
                    }
                    return [2 /*return*/, NextResponse.json(result)];
                case 6:
                    error_1 = _d.sent();
                    console.error('Error fetching subscriber growth data:', error_1);
                    return [2 /*return*/, new NextResponse('Internal Server Error', { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
//# sourceMappingURL=route.js.map