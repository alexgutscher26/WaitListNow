'use server';
import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
export function getSubscriberGrowth(waitlistId_1) {
    return __awaiter(this, arguments, void 0, function (waitlistId, days) {
        var userId, waitlist, endDate, startDate, dailyCounts, cumulativeCount, result_1, dateMap_1, currentDate, dateStr, runningTotal_1, error_1;
        if (days === void 0) { days = 30; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    userId = auth().userId;
                    if (!userId) {
                        throw new Error('Unauthorized');
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                user: {
                                    externalId: userId,
                                },
                            },
                        })];
                case 1:
                    waitlist = _a.sent();
                    if (!waitlist) {
                        throw new Error('Waitlist not found');
                    }
                    endDate = new Date();
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - days);
                    return [4 /*yield*/, db.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT \n        DATE_TRUNC('day', \"createdAt\") as date,\n        COUNT(*)::bigint as count\n      FROM \"Subscriber\"\n      WHERE \n        \"waitlistId\" = ", "\n        AND \"createdAt\" >= ", "\n        AND \"createdAt\" <= ", "\n      GROUP BY DATE_TRUNC('day', \"createdAt\")\n      ORDER BY date ASC\n    "], ["\n      SELECT \n        DATE_TRUNC('day', \"createdAt\") as date,\n        COUNT(*)::bigint as count\n      FROM \"Subscriber\"\n      WHERE \n        \"waitlistId\" = ", "\n        AND \"createdAt\" >= ", "\n        AND \"createdAt\" <= ", "\n      GROUP BY DATE_TRUNC('day', \"createdAt\")\n      ORDER BY date ASC\n    "])), waitlistId, startDate, endDate)];
                case 2:
                    dailyCounts = _a.sent();
                    cumulativeCount = 0;
                    result_1 = [];
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
                    return [4 /*yield*/, db.subscriber.count({
                            where: {
                                waitlistId: waitlistId,
                                createdAt: { lt: startDate },
                            },
                        })];
                case 3:
                    runningTotal_1 = _a.sent();
                    Array.from(dateMap_1.entries()).forEach(function (_a) {
                        var date = _a[0], count = _a[1];
                        runningTotal_1 += count;
                        result_1.push({
                            date: date,
                            count: count,
                            cumulative: runningTotal_1,
                        });
                    });
                    return [2 /*return*/, result_1];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching subscriber growth data:', error_1);
                    throw new Error('Failed to fetch subscriber growth data');
                case 5: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
//# sourceMappingURL=subscriber-stats.js.map