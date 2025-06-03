'server only';
import { __awaiter, __generator } from "tslib";
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
/**
 * Fetches and calculates user metrics such as active waitlists, total signups, and conversion rate.
 *
 * The function first authenticates the user to get their ID. It then retrieves the user's data including
 * their waitlists and subscribers from the database. If the user is not found or unauthorized, it throws an error.
 * Metrics are calculated based on the retrieved data, and a default set of metrics is returned in case of any errors.
 *
 * @returns An object containing the active waitlists count, total signups count, and conversion rate.
 * @throws Error If authentication fails or if the user is not found.
 */
export function getUserMetrics() {
    return __awaiter(this, void 0, void 0, function () {
        var authResponse, userId, user, activeWaitlists, totalSignups, conversionRate, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResponse = _a.sent();
                    userId = authResponse.userId;
                    if (!userId) {
                        throw new Error('Unauthorized');
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                            include: {
                                waitlists: {
                                    include: {
                                        _count: {
                                            select: { subscribers: true },
                                        },
                                    },
                                },
                                subscribers: true,
                            },
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('User not found');
                    }
                    activeWaitlists = user.waitlists.filter(function (waitlist) { return waitlist.status === 'ACTIVE'; }).length;
                    totalSignups = user.subscribers.length;
                    conversionRate = activeWaitlists > 0
                        ? Math.min(100, Math.round((totalSignups / (activeWaitlists * 50)) * 100))
                        : 0;
                    return [2 /*return*/, {
                            activeWaitlists: activeWaitlists,
                            totalSignups: totalSignups,
                            conversionRate: Math.min(100, conversionRate), // Cap at 100%
                        }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching user metrics:', error_1);
                    // Return default values in case of error
                    return [2 /*return*/, {
                            activeWaitlists: 0,
                            totalSignups: 0,
                            conversionRate: 0,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=metrics.js.map