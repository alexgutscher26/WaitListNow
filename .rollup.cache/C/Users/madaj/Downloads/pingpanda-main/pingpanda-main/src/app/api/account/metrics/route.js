import { __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
/**
 * Handles GET requests to fetch user metrics.
 *
 * This function retrieves user data, including their waitlists and subscribers,
 * calculates various metrics such as active waitlists, total signups, and a placeholder conversion rate,
 * and returns these metrics in a JSON response. If the user is not found or unauthorized, it returns an appropriate error.
 *
 * @returns A JSON response containing user metrics or an error message.
 */
export function GET() {
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
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
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
                        return [2 /*return*/, NextResponse.json({ error: 'User not found' }, { status: 404 })];
                    }
                    activeWaitlists = user.waitlists.filter(function (waitlist) { return waitlist.status === 'ACTIVE'; }).length;
                    totalSignups = user.subscribers.length;
                    conversionRate = activeWaitlists > 0
                        ? Math.min(100, Math.round((totalSignups / (activeWaitlists * 50)) * 100))
                        : 0;
                    return [2 /*return*/, NextResponse.json({
                            activeWaitlists: activeWaitlists,
                            totalSignups: totalSignups,
                            conversionRate: conversionRate,
                            plan: user.plan, // Include the user's plan in the response
                        })];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching user metrics:', error_1);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Failed to fetch metrics',
                            details: error_1 instanceof Error ? error_1.message : 'Unknown error',
                        }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map