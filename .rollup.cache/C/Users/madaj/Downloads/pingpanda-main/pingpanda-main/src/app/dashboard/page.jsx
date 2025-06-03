import { __assign, __awaiter, __generator } from 'tslib';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  BarChart3,
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  Mail,
  Activity,
  DollarSign,
  Bell,
  Settings,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
} from 'lucide-react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { db } from '@/lib/db';
import { cn } from '@/utils';
import { formatDistanceToNow } from 'date-fns';
import { getWaitlistStats } from '@/app/actions/waitlist';
import { ExportButton } from '@/components/export-button';
// Enhanced stats with growth indicators and more detailed metrics
var getStats = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var stats,
      recentActivity,
      approvedSubscribers,
      averageWaitTime,
      totalWaitTimeMs,
      avgWaitTimeMs,
      avgWaitTimeHours,
      minutes,
      hours,
      days,
      conversionRate,
      monthlyGrowth,
      waitlistsWithGrowth,
      error_1;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          return [4 /*yield*/, getWaitlistStats()];
        case 1:
          stats = _b.sent();
          // Debug: Log the raw stats from getWaitlistStats
          console.log('Raw stats from getWaitlistStats:', JSON.stringify(stats, null, 2));
          console.log(
            'Recent activities count from API:',
            ((_a = stats.recentActivities) === null || _a === void 0 ? void 0 : _a.length) || 0,
          );
          // Debug: Log the raw activities before mapping
          console.log(
            'Raw activities before mapping:',
            JSON.stringify(stats.recentActivities || [], null, 2),
          );
          recentActivity = (stats.recentActivities || []).map(function (act, index) {
            console.log('Mapping activity '.concat(index, ':'), JSON.stringify(act, null, 2));
            var base = {
              id: act.id,
              type: act.type,
              name: act.name || 'Unknown',
              time: new Date(act.time || new Date()),
            };
            switch (act.type) {
              case 'new_subscriber':
                return __assign(__assign({}, base), {
                  type: 'new_subscriber',
                  email: act.email || '',
                  waitlist: act.waitlist || '',
                  avatar:
                    act.avatar ||
                    'https://api.dicebear.com/7.x/initials/svg?seed='.concat(act.email || 'user'),
                });
              case 'waitlist_created':
                return __assign(__assign({}, base), {
                  type: 'waitlist_created',
                  subscribers: act.subscribers || 0,
                });
              case 'referral':
                return __assign(__assign({}, base), {
                  type: 'referral',
                  referrer: act.referrer || 'someone',
                  referred: act.referred || '',
                  reward: act.reward || 'Early access',
                });
              case 'conversion':
                return __assign(__assign({}, base), {
                  type: 'conversion',
                  revenue: act.revenue || 0,
                  waitlist: act.waitlist || '',
                });
              case 'milestone':
                return __assign(__assign({}, base), {
                  type: 'milestone',
                  message: act.message || '',
                });
              default:
                console.warn('Unknown activity type:', act.type, act);
                return base;
            }
          });
          console.log('Mapped activities count:', recentActivity.length);
          console.log('Mapped activities:', JSON.stringify(recentActivity, null, 2));
          return [
            4 /*yield*/,
            db.subscriber.findMany({
              where: {
                status: 'APPROVED',
                waitlistId: {
                  in: stats.waitlists.map(function (w) {
                    return w.id;
                  }),
                },
              },
              select: {
                createdAt: true,
                updatedAt: true,
              },
            }),
          ];
        case 2:
          approvedSubscribers = _b.sent();
          averageWaitTime = 'N/A';
          if (approvedSubscribers.length > 0) {
            totalWaitTimeMs = approvedSubscribers.reduce(function (sum, sub) {
              var waitTimeMs = sub.updatedAt.getTime() - sub.createdAt.getTime();
              return sum + waitTimeMs;
            }, 0);
            avgWaitTimeMs = totalWaitTimeMs / approvedSubscribers.length;
            avgWaitTimeHours = avgWaitTimeMs / (1000 * 60 * 60);
            // Format the average wait time
            if (avgWaitTimeHours < 1) {
              minutes = Math.round(avgWaitTimeHours * 60);
              averageWaitTime = ''
                .concat(minutes, ' ')
                .concat(minutes === 1 ? 'minute' : 'minutes');
            } else if (avgWaitTimeHours < 24) {
              hours = Math.round(avgWaitTimeHours * 10) / 10;
              averageWaitTime = ''.concat(hours, ' ').concat(hours === 1 ? 'hour' : 'hours');
            } else {
              days = Math.round((avgWaitTimeHours / 24) * 10) / 10;
              averageWaitTime = ''.concat(days, ' ').concat(days === 1 ? 'day' : 'days');
            }
          }
          conversionRate =
            stats.totalSubscribers > 0
              ? Math.min(100, Math.round((stats.newThisWeek / stats.totalSubscribers) * 1000) / 10)
              : 0;
          monthlyGrowth = stats.growthRate * 4;
          return [
            4 /*yield*/,
            Promise.all(
              stats.waitlists.map(function (wl) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var now, oneWeekAgo, twoWeeksAgo, _a, currentWeekCount, previousWeekCount, growth;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        now = new Date();
                        oneWeekAgo = new Date(now);
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        twoWeeksAgo = new Date(now);
                        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
                        return [
                          4 /*yield*/,
                          Promise.all([
                            db.subscriber.count({
                              where: {
                                waitlistId: wl.id,
                                createdAt: { gte: oneWeekAgo },
                              },
                            }),
                            db.subscriber.count({
                              where: {
                                waitlistId: wl.id,
                                createdAt: { gte: twoWeeksAgo, lt: oneWeekAgo },
                              },
                            }),
                          ]),
                        ];
                      case 1:
                        (_a = _b.sent()), (currentWeekCount = _a[0]), (previousWeekCount = _a[1]);
                        growth = 0;
                        if (previousWeekCount > 0) {
                          growth =
                            ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
                        } else if (currentWeekCount > 0) {
                          // If there were no subscribers in the previous week but there are now, show 100% growth
                          growth = 100;
                        }
                        return [
                          2 /*return*/,
                          __assign(__assign({}, wl), { growth: Math.round(growth * 10) / 10 }),
                        ];
                    }
                  });
                });
              }),
            ),
          ];
        case 3:
          waitlistsWithGrowth = _b.sent();
          return [
            2 /*return*/,
            {
              totalSubscribers: stats.totalSubscribers,
              newThisWeek: stats.newThisWeek,
              growthRate: stats.growthRate,
              activeWaitlists: stats.activeWaitlists,
              completedWaitlists: stats.completedWaitlists,
              averageWaitTime: averageWaitTime,
              conversionRate: conversionRate,
              monthlyGrowth: monthlyGrowth,
              recentActivity: recentActivity,
              topWaitlists: waitlistsWithGrowth.map(function (wl) {
                return {
                  id: wl.id,
                  name: wl.name,
                  subscribers: wl.subscribers,
                  growth: wl.growth,
                };
              }),
            },
          ];
        case 4:
          error_1 = _b.sent();
          console.error('Error loading stats:', error_1);
          // Return empty stats if there's an error
          return [
            2 /*return*/,
            {
              totalSubscribers: 0,
              newThisWeek: 0,
              growthRate: 0,
              activeWaitlists: 0,
              completedWaitlists: 0,
              averageWaitTime: '0 days',
              conversionRate: 0,
              monthlyGrowth: 0,
              recentActivity: [
                {
                  id: 1,
                  type: 'milestone',
                  name: 'Welcome to WaitListNow!',
                  message: 'Start by creating your first waitlist to see activity here.',
                  time: new Date(),
                },
              ],
              topWaitlists: [],
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
};
/**
 * Returns a React component for rendering an activity icon based on the given type.
 *
 * This function maps each activity type to its corresponding icon component,
 * applying specific styles and class names as needed. If the type does not match any
 * known cases, it throws an exhaustive check error to ensure all types are handled.
 *
 * @param type - The type of the activity for which to get the icon.
 * @returns A React functional component that renders the appropriate icon with given className.
 */
var getActivityIcon = function (type) {
  var _exhaustiveCheck = function (type) {
    throw new Error('Unexpected activity type: '.concat(type));
  };
  switch (type) {
    case 'new_subscriber':
      return function (_a) {
        var className = _a.className;
        return <Users className={cn('h-4 w-4 text-blue-600', className)} />;
      };
    case 'waitlist_created':
      return function (_a) {
        var className = _a.className;
        return <Zap className={cn('h-4 w-4 text-green-600', className)} />;
      };
    case 'referral':
      return function (_a) {
        var className = _a.className;
        return <Mail className={cn('h-4 w-4 text-purple-600', className)} />;
      };
    case 'conversion':
      return function (_a) {
        var className = _a.className;
        return <DollarSign className={cn('h-4 w-4 text-green-600', className)} />;
      };
    case 'milestone':
      return function (_a) {
        var className = _a.className;
        return <TrendingUp className={cn('h-4 w-4 text-orange-600', className)} />;
      };
    default:
      _exhaustiveCheck(type);
      return function (_a) {
        var className = _a.className;
        return <Bell className={cn('h-4 w-4 text-gray-600', className)} />;
      };
  }
};
/**
 * Formats an activity message based on the type of activity.
 *
 * This function uses a switch statement to determine the type of activity and returns a corresponding JSX element with formatted text.
 * The activity types include 'new_subscriber', 'waitlist_created', 'referral', 'conversion', and 'milestone'.
 * Each case handles different formatting requirements for specific activity details.
 *
 * @param activity - An object containing details about the activity.
 * @returns A JSX element representing the formatted activity message.
 */
var formatActivityMessage = function (activity) {
  switch (activity.type) {
    case 'new_subscriber':
      return (
        <div>
          <p className="text-sm font-medium">
            <span className="font-semibold">{activity.name}</span> joined{' '}
            <span className="text-primary">{activity.waitlist}</span>
          </p>
          <p className="text-xs text-muted-foreground">{activity.email}</p>
        </div>
      );
    case 'waitlist_created':
      return (
        <div>
          <p className="text-sm font-medium">New waitlist created</p>
          <p className="text-xs text-muted-foreground">{activity.name}</p>
        </div>
      );
    case 'referral':
      return (
        <div>
          <p className="text-sm font-medium">
            <span className="font-semibold">{activity.referrer}</span> referred someone
          </p>
          <p className="text-xs text-muted-foreground">
            {activity.referred} • Reward: {activity.reward}
          </p>
        </div>
      );
    case 'conversion':
      return (
        <div>
          <p className="text-sm font-medium">
            <span className="font-semibold">{activity.name}</span> converted from{' '}
            <span className="text-primary">{activity.waitlist}</span>
          </p>
          <p className="text-xs text-muted-foreground">Revenue: {activity.revenue}</p>
        </div>
      );
    case 'milestone':
      return (
        <div>
          <p className="text-sm font-medium">{activity.message}</p>
        </div>
      );
    default:
      return <p className="text-sm">Unknown activity</p>;
  }
};
/**
 * Renders a stat card component with title, value, icon, and optional trend indicators.
 *
 * This component displays a card containing a title, a main value, an icon,
 * and optionally shows a trend indicator if both `trend` and `trendValue` are provided.
 * The trend can be either 'up' or 'down', affecting the styling and icon used.
 */
var StatCard = function (_a) {
  var title = _a.title,
    value = _a.value,
    Icon = _a.icon,
    trend = _a.trend,
    trendValue = _a.trendValue,
    _b = _a.className,
    className = _b === void 0 ? '' : _b;
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
            {trend && trendValue && (
              <div
                className={cn(
                  'mt-2 inline-flex items-center text-sm font-medium',
                  trend === 'up' ? 'text-green-600' : 'text-red-600',
                )}
              >
                {trend === 'up' ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {trendValue}
              </div>
            )}
          </div>
          <div className="rounded-lg bg-brand-50 p-3">
            <Icon className="h-6 w-6 text-brand-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
/**
 * Renders an activity item with an icon, message, and timestamp.
 */
var ActivityItem = function (_a) {
  var activity = _a.activity;
  var IconComponent = getActivityIcon(activity.type);
  var message = formatActivityMessage(activity);
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-brand-600" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{message}</div>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
        </p>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
};
/**
 * Renders the main dashboard page for a user, displaying their waitlists and related statistics.
 *
 * This function performs several key tasks:
 * 1. Retrieves the current user information and checks if they are authenticated.
 * 2. Redirects to the sign-in page if the user is not logged in.
 * 3. Determines if the user has premium access and whether to display an upgrade banner based on query parameters.
 * 4. Fetches the user's recent waitlists with subscriber counts.
 * 5. Renders various cards, tables, and components displaying statistics, recent activity, and waitlist details.
 */
export default function Page(_a) {
  return __awaiter(this, arguments, void 0, function (_b) {
    var stats,
      user,
      userData,
      isAdmin,
      hasExportAccess,
      upgradeParam,
      dbUser,
      allWaitlists,
      waitlists;
    var _c = _b.searchParams,
      searchParams = _c === void 0 ? {} : _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          return [4 /*yield*/, getStats()];
        case 1:
          stats = _d.sent();
          return [4 /*yield*/, currentUser()];
        case 2:
          user = _d.sent();
          if (!user) {
            redirect('/sign-in');
          }
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { externalId: user.id },
              select: {
                role: true,
                plan: true,
              },
            }),
          ];
        case 3:
          userData = _d.sent();
          isAdmin = (userData === null || userData === void 0 ? void 0 : userData.role) === 'ADMIN';
          hasExportAccess =
            (userData === null || userData === void 0 ? void 0 : userData.plan) !== 'FREE';
          upgradeParam =
            searchParams === null || searchParams === void 0 ? void 0 : searchParams.upgrade;
          console.log('Clerk user ID:', user.id);
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { externalId: user.id },
              select: { id: true },
            }),
          ];
        case 4:
          dbUser = _d.sent();
          console.log('Database user:', dbUser);
          return [
            4 /*yield*/,
            db.waitlist.findMany({
              select: { id: true, name: true, userId: true },
              take: 10,
            }),
          ];
        case 5:
          allWaitlists = _d.sent();
          console.log('All waitlists in database:', allWaitlists);
          return [
            4 /*yield*/,
            db.waitlist.findMany({
              where: {
                userId: (dbUser === null || dbUser === void 0 ? void 0 : dbUser.id) || '',
              },
              include: {
                _count: {
                  select: {
                    subscribers: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 3,
            }),
          ];
        case 6:
          waitlists = _d.sent();
          console.log('Found waitlists for user:', waitlists);
          return [
            2 /*return*/,
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Welcome back, {user.firstName || 'User'}! 👋
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Here&apos;s what&apos;s happening with your waitlists today.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ExportButton hasExportAccess={hasExportAccess} />
                  <Button
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <Link href="/dashboard/waitlists/new">
                      <Plus className="h-4 w-4" />
                      New Waitlist
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Subscribers"
                  value={stats.totalSubscribers.toLocaleString()}
                  icon={Users}
                  trend="up"
                  trendValue={'+'.concat(stats.newThisWeek, ' this week')}
                />
                <StatCard
                  title="Active Waitlists"
                  value={stats.activeWaitlists}
                  icon={Activity}
                  trend="up"
                  trendValue={''.concat(stats.completedWaitlists, ' completed')}
                />
                <StatCard
                  title="Conversion Rate"
                  value={''.concat(stats.conversionRate, '%')}
                  icon={BarChart3}
                  trend="up"
                  trendValue="+12.1% from last month"
                />
                <StatCard
                  title="System Status"
                  value="All Systems"
                  icon={Activity}
                  trend="up"
                  trendValue="Operational"
                  className="bg-green-50 text-green-700"
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest actions across your waitlists</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-brand-600 hover:text-brand-700"
                      >
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {stats.recentActivity && stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map(function (activity) {
                          return (
                            <ActivityItem
                              key={activity.id}
                              activity={activity}
                            />
                          );
                        })
                      ) : (
                        <div className="p-6 text-center text-sm text-gray-500">
                          No recent activities found
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Waitlist Health</CardTitle>
                      <CardDescription>Performance overview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Subscriber Growth */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Subscriber Growth</span>
                          <span
                            className={'font-medium '.concat(
                              stats.growthRate > 0
                                ? 'text-green-600'
                                : stats.growthRate < 0
                                  ? 'text-red-600'
                                  : 'text-gray-600',
                            )}
                          >
                            {stats.growthRate > 0 ? '+' : ''}
                            {stats.growthRate.toFixed(1)}% (Week)
                          </span>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                {stats.totalSubscribers} total
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                              style={{
                                width: ''.concat(
                                  Math.min(
                                    100,
                                    (stats.newThisWeek /
                                      Math.max(1, stats.totalSubscribers - stats.newThisWeek)) *
                                      100,
                                  ),
                                  '%',
                                ),
                              }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Active Subscribers */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Active Subscribers</span>
                          <span className="font-medium text-gray-900">
                            {stats.totalSubscribers}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{
                              width: ''.concat(
                                Math.min(100, (stats.totalSubscribers / 1000) * 100),
                                '%',
                              ),
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {stats.newThisWeek} new this week
                        </p>
                      </div>

                      {/* Waitlist Status */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Waitlist Status</span>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-gray-600">{stats.activeWaitlists} Active</span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                            <span className="text-gray-600">
                              {stats.completedWaitlists} Archived
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{
                              width: ''.concat(
                                (stats.activeWaitlists /
                                  (stats.activeWaitlists + stats.completedWaitlists)) *
                                  100,
                                '%',
                              ),
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="justify-start gap-2 h-10"
                      >
                        <Link href="/dashboard/waitlists/new">
                          <Plus className="h-4 w-4" />
                          Create Waitlist
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start gap-2 h-10"
                      >
                        <Settings className="h-4 w-4" />
                        <Link href="/dashboard/account-settings">Account Settings</Link>
                      </Button>
                      {/* <Button asChild variant="outline" className="justify-start gap-2 h-10">
                              <Link href="/dashboard/subscribers">
                                <Users className="h-4 w-4" />
                                View All Subscribers
                              </Link>
                            </Button> */}
                      {/* <Button asChild variant="outline" className="justify-start gap-2 h-10">
                              <Link href="/dashboard/email">
                                <Mail className="h-4 w-4" />
                                Email Subscribers
                              </Link>
                            </Button> */}
                      {/* <Button asChild variant="outline" className="justify-start gap-2 h-10">
                              <Link href="/dashboard/analytics">
                                <BarChart3 className="h-4 w-4" />
                                View Analytics
                              </Link>
                            </Button> */}
                      {/* <Button
                              variant="outline"
                              className="justify-start gap-2 h-10"
                            >
                              <BarChart3 className="h-4 w-4" />
                              View Analytics
                            </Button> */}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* System Status - Admin Only */}
              {isAdmin && (
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current status of all systems (Admin Only)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">All Systems Operational</h4>
                            <p className="text-sm text-gray-500">
                              Last checked: {new Date().toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Operational
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {[
                          { name: 'API', status: 'operational', lastChecked: 'Just now' },
                          { name: 'Database', status: 'operational', lastChecked: 'Just now' },
                          { name: 'Email Service', status: 'operational', lastChecked: 'Just now' },
                          {
                            name: 'Authentication',
                            status: 'operational',
                            lastChecked: 'Just now',
                          },
                        ].map(function (system) {
                          return (
                            <div
                              key={system.name}
                              className="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                            >
                              <div className="flex-shrink-0">
                                <div
                                  className={'h-2.5 w-2.5 rounded-full '.concat(
                                    system.status === 'operational' ? 'bg-green-500' : 'bg-red-500',
                                  )}
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium text-gray-900">{system.name}</p>
                                  <span className="text-xs text-gray-500">
                                    {system.lastChecked}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 capitalize">{system.status}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Your Waitlists */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Waitlists</CardTitle>
                      <CardDescription>Manage your active waitlists</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {waitlists.length > 0 ? (
                    <>
                      <div className="overflow-hidden rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Subscribers</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {waitlists.map(function (waitlist) {
                              return (
                                <TableRow key={waitlist.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                      <div className="h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-brand-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{waitlist.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          {waitlist._count.subscribers} subscribers
                                        </p>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-sm text-muted-foreground">
                                      {new Date(waitlist.createdAt).toLocaleDateString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-green-50 text-green-700"
                                    >
                                      Active
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      asChild
                                    >
                                      <Link href={'/dashboard/waitlists/'.concat(waitlist.id)}>
                                        View
                                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                      </Link>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        asChild
                      >
                        <Link href="/dashboard/waitlists">View All Waitlists</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No waitlists found. Create your first waitlist to get started.
                      </p>
                      <Button asChild>
                        <Link href="/dashboard/waitlists/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Waitlist
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>,
          ];
      }
    });
  });
}
//# sourceMappingURL=page.jsx.map
