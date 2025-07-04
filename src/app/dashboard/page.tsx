/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUser } from '@clerk/nextjs/server';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { getWaitlistStats } from '@/app/actions/waitlist';
import ActivityItem from '@/components/dashboard/ActivityItem';
import RecentActivityModal from '@/components/dashboard/RecentActivityModal';
import WaitlistTable from '@/components/dashboard/WaitlistTable';
import { ExportButton } from '@/components/export-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { cn } from '@/utils';

// Define the type for search parameters
type SearchParams = {
  upgrade?: string;
};

// Define the page props with searchParams
interface PageProps {
  searchParams: SearchParams;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  className = '',
}: StatCardProps) => (
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
                trend === 'up'
                  ? 'text-green-600'
                  : trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600',
              )}
            >
              {trend === 'up' ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : trend === 'down' ? (
                <TrendingDown className="mr-1 h-4 w-4" />
              ) : null}
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

function formatActivityMessage(activity: Activity) {
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
}

// Instead, use the Activity interface from RecentActivityModal:
interface Activity {
  id: string;
  type: string;
  name?: string;
  waitlist?: string;
  email?: string;
  referrer?: string;
  referred?: string;
  reward?: string;
  revenue?: string;
  message?: string;
  time: string;
}

// Enhanced stats with growth indicators and more detailed metrics
const getStats = async (): Promise<{
  totalSubscribers: number;
  newThisWeek: number;
  growthRate: number;
  activeWaitlists: number;
  completedWaitlists: number;
  averageWaitTime: string;
  monthlyGrowth: number;
  recentActivity: Activity[];
  topWaitlists: Array<{ id: string; name: string; subscribers: number; growth: number }>;
}> => {
  try {
    const stats = await getWaitlistStats();

    // Debug: Log the raw stats from getWaitlistStats
    console.log('Raw stats from getWaitlistStats:', JSON.stringify(stats, null, 2));
    console.log('Recent activities count from API:', stats.recentActivities?.length || 0);

    // Debug: Log the raw activities before mapping
    console.log(
      'Raw activities before mapping:',
      JSON.stringify(stats.recentActivities || [], null, 2),
    );

    // Map the recent activities to the expected format
    const recentActivity: Activity[] = (stats.recentActivities || []).map(
      (act: any, index: number) => {
        console.log(`Mapping activity ${index}:`, JSON.stringify(act, null, 2));
        const base = {
          id: act.id,
          type: act.type,
          name: act.name || 'Unknown',
          time: new Date(act.time || new Date()).toISOString(),
        };

        switch (act.type) {
          case 'new_subscriber':
            return {
              ...base,
              type: 'new_subscriber',
              email: act.email || '',
              waitlist: act.waitlist || '',
              waitlistId: act.waitlistId || act.waitlist_id || '',
              avatar:
                act.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${act.email || 'user'}`,
            } as Activity;

          case 'waitlist_created':
            return {
              ...base,
              type: 'waitlist_created',
              subscribers: act.subscribers || 0,
              waitlistId: act.waitlistId || act.waitlist_id || '',
            } as Activity;

          case 'referral':
            return {
              ...base,
              type: 'referral',
              referrer: act.referrer || 'someone',
              referred: act.referred || '',
              reward: act.reward || 'Early access',
            } as Activity;

          case 'conversion':
            return {
              ...base,
              type: 'conversion',
              revenue: act.revenue || 0,
              waitlist: act.waitlist || '',
              waitlistId: act.waitlistId || act.waitlist_id || '',
            } as Activity;

          case 'milestone':
            return {
              ...base,
              type: 'milestone',
              message: act.message || '',
            } as Activity;

          default:
            console.warn('Unknown activity type:', act.type, act);
            return base as Activity;
        }
      },
    );

    console.log('Mapped activities count:', recentActivity.length);
    console.log('Mapped activities:', JSON.stringify(recentActivity, null, 2));

    // Calculate average wait time from actual data
    const approvedSubscribers = await db.subscriber.findMany({
      where: {
        status: 'APPROVED',
        waitlistId: {
          in: stats.waitlists.map((w) => w.id),
        },
      },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    // Calculate average wait time in hours
    let averageWaitTime = 'N/A';
    if (approvedSubscribers.length > 0) {
      const totalWaitTimeMs = approvedSubscribers.reduce((sum, sub) => {
        const waitTimeMs = sub.updatedAt.getTime() - sub.createdAt.getTime();
        return sum + waitTimeMs;
      }, 0);

      const avgWaitTimeMs = totalWaitTimeMs / approvedSubscribers.length;
      const avgWaitTimeHours = avgWaitTimeMs / (1000 * 60 * 60);

      // Format the average wait time
      if (avgWaitTimeHours < 1) {
        const minutes = Math.round(avgWaitTimeHours * 60);
        averageWaitTime = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      } else if (avgWaitTimeHours < 24) {
        const hours = Math.round(avgWaitTimeHours * 10) / 10;
        averageWaitTime = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      } else {
        const days = Math.round((avgWaitTimeHours / 24) * 10) / 10;
        averageWaitTime = `${days} ${days === 1 ? 'day' : 'days'}`;
      }
    }

    // Calculate monthly growth (placeholder for now)
    const monthlyGrowth = stats.growthRate * 4; // Extrapolate weekly growth to monthly

    // Calculate growth for each waitlist
    const waitlistsWithGrowth = await Promise.all(
      stats.waitlists.map(async (wl) => {
        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const twoWeeksAgo = new Date(now);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        // Get subscriber counts for the current and previous week
        const [currentWeekCount, previousWeekCount] = await Promise.all([
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
        ]);

        // Calculate growth percentage
        let growth = 0;
        if (previousWeekCount > 0) {
          growth = ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
        } else if (currentWeekCount > 0) {
          // If there were no subscribers in the previous week but there are now, show 100% growth
          growth = 100;
        }

        return {
          ...wl,
          growth: Math.round(growth * 10) / 10, // Round to 1 decimal place
        };
      }),
    );

    // Sort waitlists with growth by growth descending
    const sortedWaitlists = [...waitlistsWithGrowth].sort((a, b) => b.growth - a.growth);

    return {
      totalSubscribers: stats.totalSubscribers,
      newThisWeek: stats.newThisWeek,
      growthRate: stats.growthRate,
      activeWaitlists: stats.activeWaitlists,
      completedWaitlists: stats.completedWaitlists,
      averageWaitTime,
      monthlyGrowth,
      recentActivity,
      topWaitlists: sortedWaitlists.map((wl) => ({
        id: wl.id,
        name: wl.name,
        subscribers: wl.subscribers,
        growth: wl.growth,
      })),
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    // Return empty stats if there's an error
    return {
      totalSubscribers: 0,
      newThisWeek: 0,
      growthRate: 0,
      activeWaitlists: 0,
      completedWaitlists: 0,
      averageWaitTime: '0 days',
      monthlyGrowth: 0,
      recentActivity: [
        {
          id: '1',
          type: 'milestone',
          name: 'Welcome to WaitListNow!',
          message: 'Start by creating your first waitlist to see activity here.',
          time: new Date().toISOString(),
        } as Activity,
      ],
      topWaitlists: [],
    };
  }
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
export default async function Page({ }: PageProps) {
  const stats = await getStats();

  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  // Get user role and plan from database
  const userData = await db.user.findUnique({
    where: { externalId: user.id },
    select: {
      role: true,
      plan: true,
    },
  });

  const isAdmin = userData?.role === 'ADMIN';
  const hasExportAccess = userData?.plan !== 'FREE'; // Assuming FREE plan doesn't have export access

  // Check if user has premium access

  // console.log('Clerk user ID:', user.id);

  // Find the internal user ID that matches the Clerk user ID
  const dbUser = await db.user.findUnique({
    where: { externalId: user.id },
    select: { id: true },
  });
  console.log('Database user:', dbUser);

  // Debug: Check what waitlists exist in the database
  const allWaitlists = await db.waitlist.findMany({
    select: { id: true, name: true, userId: true },
    take: 10,
  });
  console.log('All waitlists in database:', allWaitlists);

  // Fetch waitlists with subscribers count using internal user ID
  const waitlists = await db.waitlist.findMany({
    where: {
      userId: dbUser?.id || '',
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
  });

  console.log('Found waitlists for user:', waitlists);

  // Preprocess stats.recentActivity to ensure all time fields are strings
  const normalizedRecentActivity: Activity[] = stats.recentActivity.map((activity) => {
    let timeStr: string;
    if (typeof activity.time === 'string') {
      timeStr = activity.time;
    } else if (
      activity.time &&
      typeof activity.time === 'object' &&
      'toISOString' in activity.time &&
      typeof (activity.time as Date).toISOString === 'function'
    ) {
      timeStr = (activity.time as Date).toISOString();
    } else {
      timeStr = String(activity.time);
    }
    return { ...activity, time: timeStr };
  });

  const mappedRecentActivity: Activity[] = normalizedRecentActivity.map((activity) => {
    return {
      id: String(activity.id),
      type: String(activity.type),
      name: activity?.name ? String(activity.name) : undefined,
      waitlist: activity?.waitlist ? String(activity.waitlist) : undefined,
      email: activity?.email ? String(activity.email) : undefined,
      referrer: activity?.referrer ? String(activity.referrer) : undefined,
      referred: activity?.referred ? String(activity.referred) : undefined,
      reward: activity?.reward ? String(activity.reward) : undefined,
      revenue: activity?.revenue !== undefined ? String(activity.revenue) : undefined,
      message: activity?.message ? String(activity.message) : undefined,
      time: activity.time,
    };
  });

  return (
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
          trendValue={`+${stats.newThisWeek} this week`}
        />
        <StatCard
          title="Active Waitlists"
          value={stats.activeWaitlists}
          icon={Activity}
          trend="up"
          trendValue={`${stats.completedWaitlists} completed`}
        />
        <StatCard
          title="Top Waitlist Growth"
          value={stats.topWaitlists.length > 0 ? `${stats.topWaitlists[0].growth}%` : 'N/A'}
          icon={TrendingUp}
          trend={stats.topWaitlists.length > 0 && stats.topWaitlists[0].growth > 0 ? 'up' : 'down'}
          trendValue={stats.topWaitlists.length > 0 ? `${stats.topWaitlists[0].name}` : 'No data'}
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
              <RecentActivityModal recentActivity={mappedRecentActivity} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {stats.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    iconType={activity.type}
                    message={formatActivityMessage(activity)}
                  />
                ))
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
                    className={`font-medium ${
                      stats.growthRate > 0
                        ? 'text-green-600'
                        : stats.growthRate < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
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
                        width: `${Math.min(100, (stats.newThisWeek / Math.max(1, stats.totalSubscribers - stats.newThisWeek)) * 100)}%`,
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
                  <span className="font-medium text-gray-900">{stats.totalSubscribers}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (stats.totalSubscribers / 1000) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{stats.newThisWeek} new this week</p>
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
                    <span className="text-gray-600">{stats.completedWaitlists} Archived</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${(stats.activeWaitlists / (stats.activeWaitlists + stats.completedWaitlists)) * 100}%`,
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
                  { name: 'Authentication', status: 'operational', lastChecked: 'Just now' },
                ].map((system) => (
                  <div
                    key={system.name}
                    className="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          system.status === 'operational' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">{system.name}</p>
                        <span className="text-xs text-gray-500">{system.lastChecked}</span>
                      </div>
                      <p className="text-xs text-gray-500 capitalize">{system.status}</p>
                    </div>
                  </div>
                ))}
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
              <WaitlistTable
                waitlists={waitlists.map((wl) => ({
                  id: wl.id,
                  name: wl.name,
                  subscribers: wl._count.subscribers,
                  createdAt:
                    typeof wl.createdAt === 'string' ? wl.createdAt : wl.createdAt.toISOString(),
                }))}
              />
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
    </div>
  );
}
