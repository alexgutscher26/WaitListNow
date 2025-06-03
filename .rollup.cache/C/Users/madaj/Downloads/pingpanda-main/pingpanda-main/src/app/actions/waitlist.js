'use server';
import { __awaiter, __generator } from "tslib";
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
/**
 * Fetches comprehensive statistics related to user waitlists.
 *
 * This function retrieves detailed data including total subscribers, new subscribers from the past week,
 * growth rate, active and completed waitlists, recent activities, and individual waitlist details.
 * It involves multiple database queries to gather all necessary information and performs calculations
 * for derived metrics like growth rate and recent activities. The function handles user authentication
 * and ensures that only authorized users can access their waitlist statistics.
 *
 * @returns An object containing various statistics and details about the user's waitlists.
 * @throws Error if the user is not authenticated or if there is an issue fetching data from the database.
 */
export function getWaitlistStats() {
    return __awaiter(this, void 0, void 0, function () {
        var authResponse, clerkUserId, user, userId, userWaitlists, subscriberStats, waitlists, recentWaitlists, totalSubscribers, newThisWeek, now_1, fourWeeksAgo_1, weeklySubscribers_1, growthRate, validWeeks, i, currentWeek, previousWeek, weeklyGrowth, recentActivity, currentTime, _i, recentWaitlists_1, wl, subscriberCount, _loop_1, _a, waitlists_1, wl, milestone, sortedActivities, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResponse = (_b.sent());
                    clerkUserId = authResponse.userId;
                    if (!clerkUserId) {
                        throw new Error('Unauthorized: You must be signed in to view waitlist stats');
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: clerkUserId },
                            select: { id: true },
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, {
                                totalSubscribers: 0,
                                newThisWeek: 0,
                                growthRate: 0,
                                activeWaitlists: 0,
                                completedWaitlists: 0,
                                recentActivities: [],
                                waitlists: [],
                            }];
                    }
                    userId = user.id;
                    return [4 /*yield*/, db.waitlist.findMany({
                            where: { userId: userId },
                            select: {
                                id: true,
                                name: true,
                                subscribers: {
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        createdAt: true,
                                        referralCode: true,
                                        referredBy: true,
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: 100,
                                },
                                _count: {
                                    select: { subscribers: true },
                                },
                                createdAt: true,
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                case 3:
                    userWaitlists = _b.sent();
                    // If no waitlists found, return early with empty results
                    if (userWaitlists.length === 0) {
                        return [2 /*return*/, {
                                totalSubscribers: 0,
                                newThisWeek: 0,
                                growthRate: 0,
                                activeWaitlists: 0,
                                completedWaitlists: 0,
                                recentActivities: [],
                                waitlists: [],
                            }];
                    }
                    return [4 /*yield*/, db.waitlist.aggregate({
                            where: { userId: userId },
                            _sum: { subscriberCount: true },
                            _count: { id: true },
                        })];
                case 4:
                    subscriberStats = _b.sent();
                    return [4 /*yield*/, db.waitlist.findMany({
                            where: { userId: userId },
                            select: {
                                id: true,
                                name: true,
                                status: true,
                                slug: true,
                                createdAt: true,
                                subscribers: {
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        createdAt: true,
                                        referralCode: true,
                                        referredBy: true,
                                        status: true,
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: 10, // Limit to most recent 10 subscribers per waitlist
                                },
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                case 5:
                    waitlists = _b.sent();
                    return [4 /*yield*/, db.waitlist.findMany({
                            where: { userId: userId },
                            orderBy: { createdAt: 'desc' },
                            take: 5, // Get 5 most recent waitlists
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                createdAt: true,
                            },
                        })];
                case 6:
                    recentWaitlists = _b.sent();
                    totalSubscribers = waitlists.reduce(function (sum, wl) { return sum + wl.subscribers.length; }, 0);
                    newThisWeek = waitlists.reduce(function (sum, wl) {
                        var oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return sum + wl.subscribers.filter(function (sub) { return new Date(sub.createdAt) > oneWeekAgo; }).length;
                    }, 0);
                    now_1 = new Date();
                    fourWeeksAgo_1 = new Date(now_1);
                    fourWeeksAgo_1.setDate(fourWeeksAgo_1.getDate() - 28); // 4 weeks ago
                    weeklySubscribers_1 = Array(4).fill(0);
                    waitlists.forEach(function (wl) {
                        wl.subscribers.forEach(function (sub) {
                            var subDate = new Date(sub.createdAt);
                            if (subDate > fourWeeksAgo_1) {
                                // Calculate which week (0-3) this subscriber belongs to
                                var weekNum = Math.min(3, Math.floor((now_1.getTime() - subDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));
                                weeklySubscribers_1[3 - weekNum]++; // Reverse order (most recent week last)
                            }
                        });
                    });
                    growthRate = 0;
                    validWeeks = 0;
                    for (i = 1; i < weeklySubscribers_1.length; i++) {
                        currentWeek = weeklySubscribers_1[i];
                        previousWeek = weeklySubscribers_1[i - 1];
                        if (previousWeek > 0) {
                            weeklyGrowth = ((currentWeek - previousWeek) / previousWeek) * 100;
                            growthRate += weeklyGrowth;
                            validWeeks++;
                        }
                    }
                    // Calculate average growth rate if we have valid data, otherwise default to 0
                    growthRate = validWeeks > 0 ? growthRate / validWeeks : 0;
                    recentActivity = [];
                    currentTime = new Date();
                    // Add waitlist creation activities
                    for (_i = 0, recentWaitlists_1 = recentWaitlists; _i < recentWaitlists_1.length; _i++) {
                        wl = recentWaitlists_1[_i];
                        recentActivity.push({
                            id: "wl-".concat(wl.id),
                            type: 'waitlist_created',
                            name: wl.name,
                            time: wl.createdAt,
                            subscribers: 0, // Will be updated in the next step
                        });
                    }
                    subscriberCount = 0;
                    _loop_1 = function (wl) {
                        // Update waitlist creation activity with subscriber count
                        var wlActivity = recentActivity.find(function (a) { return a.id === "wl-".concat(wl.id); });
                        if (wlActivity) {
                            wlActivity.subscribers = wl.subscribers.length;
                        }
                        // Add subscriber activities
                        for (var _c = 0, _d = wl.subscribers; _c < _d.length; _c++) {
                            var sub = _d[_c];
                            subscriberCount++;
                            if (subscriberCount > 10)
                                break; // Limit total activities to prevent too many
                            recentActivity.push({
                                id: "sub-".concat(sub.id),
                                type: 'new_subscriber',
                                name: sub.name || sub.email.split('@')[0],
                                email: sub.email,
                                avatar: "https://api.dicebear.com/7.x/initials/svg?seed=".concat(sub.email),
                                waitlist: wl.name,
                                time: sub.createdAt,
                            });
                            // Add referral activity if applicable
                            if (sub.referralCode || sub.referredBy) {
                                recentActivity.push({
                                    id: "ref-".concat(sub.id),
                                    type: 'referral',
                                    name: sub.name || sub.email.split('@')[0],
                                    referrer: sub.referredBy || 'someone',
                                    referred: sub.email,
                                    reward: 'Early access',
                                    time: new Date(sub.createdAt.getTime() + 1000), // Add 1 second to ensure proper ordering
                                });
                            }
                        }
                    };
                    for (_a = 0, waitlists_1 = waitlists; _a < waitlists_1.length; _a++) {
                        wl = waitlists_1[_a];
                        _loop_1(wl);
                    }
                    milestone = Math.floor(totalSubscribers / 100) * 100;
                    if (milestone > 0 && totalSubscribers % 100 < 10) {
                        // Only show milestone when close to the next 100
                        recentActivity.push({
                            id: "mile-".concat(milestone),
                            type: 'milestone',
                            name: 'Milestone Reached',
                            message: "\uD83C\uDF89 You've reached ".concat(milestone, " total subscribers!"),
                            time: new Date(currentTime.getTime() - 1000), // 1 second ago
                        });
                    }
                    sortedActivities = recentActivity
                        .sort(function (a, b) { return b.time.getTime() - a.time.getTime(); })
                        .slice(0, 10);
                    return [2 /*return*/, {
                            totalSubscribers: totalSubscribers,
                            newThisWeek: newThisWeek,
                            growthRate: growthRate,
                            activeWaitlists: waitlists.filter(function (wl) { return wl.status === 'ACTIVE'; }).length,
                            completedWaitlists: waitlists.filter(function (wl) { return wl.status === 'ARCHIVED'; }).length,
                            recentActivities: sortedActivities,
                            waitlists: waitlists.map(function (wl) { return ({
                                id: wl.id,
                                name: wl.name,
                                subscribers: wl.subscribers.length,
                                createdAt: wl.createdAt,
                            }); }),
                        }];
                case 7:
                    error_1 = _b.sent();
                    console.error('Error fetching waitlist stats:', error_1);
                    throw new Error('Failed to fetch waitlist stats');
                case 8: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=waitlist.js.map