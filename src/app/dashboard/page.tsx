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
  Download,
  Bell,
  Settings,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface WaitlistWithCount {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  description: string | null;
  websiteUrl: string | null;
  redirectUrl: string | null;
  logoUrl: string | null;
  userId: string;
  status: string;
  settings: Record<string, any>;
  _count: {
    subscribers: number;
  };
}

type ActivityType = 'new_subscriber' | 'waitlist_created' | 'referral' | 'conversion' | 'milestone';

type BaseActivity = {
  id: number;
  type: ActivityType;
  name: string;
  time: Date;
};

type NewSubscriberActivity = BaseActivity & {
  type: 'new_subscriber';
  email: string;
  avatar: string;
  waitlist: string;
};

type WaitlistCreatedActivity = BaseActivity & {
  type: 'waitlist_created';
  subscribers: number;
};

type ReferralActivity = BaseActivity & {
  type: 'referral';
  referrer: string;
  referred: string;
  reward: string;
};

type ConversionActivity = BaseActivity & {
  type: 'conversion';
  revenue: number;
  waitlist: string;
};

type MilestoneActivity = BaseActivity & {
  type: 'milestone';
  message: string;
};

type Activity =
  | NewSubscriberActivity
  | WaitlistCreatedActivity
  | ReferralActivity
  | ConversionActivity
  | MilestoneActivity;

// Enhanced stats with growth indicators and more detailed metrics
const stats = {
  totalSubscribers: 1245,
  newThisWeek: 42,
  growthRate: 15.8, // percentage growth
  activeWaitlists: 3,
  completedWaitlists: 7,
  averageWaitTime: '2.5 days',
  conversionRate: 68.5, // percentage
  totalRevenue: 12840,
  monthlyGrowth: 23.4,
  recentActivity: [
    {
      id: 1,
      type: 'new_subscriber' as const,
      name: 'John Doe',
      email: 'john@example.com',
      time: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      avatar: 'JD',
      waitlist: 'Beta Launch',
    } satisfies NewSubscriberActivity,
    {
      id: 2,
      type: 'waitlist_created' as const,
      name: 'Premium Features Beta',
      time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      subscribers: 0,
    } satisfies WaitlistCreatedActivity,
    {
      id: 3,
      type: 'referral' as const,
      name: 'Jane Smith',
      referrer: 'Jane Smith',
      referred: 'jane@example.com',
      time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      reward: '$10',
    } satisfies ReferralActivity,
    {
      id: 4,
      type: 'conversion' as const,
      name: 'Mike Johnson',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      revenue: 99.99,
      waitlist: 'Premium Features',
    } satisfies ConversionActivity,
    {
      id: 5,
      type: 'milestone' as const,
      name: '1000 Subscribers',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      message: 'Reached 1000 subscribers on your waitlist!',
    } satisfies MilestoneActivity,
  ],
  topWaitlists: [
    { id: '1', name: 'Beta Launch', subscribers: 842, growth: 12.5 },
    { id: '2', name: 'Premium Features', subscribers: 276, growth: 8.2 },
    { id: '3', name: 'Mobile App', subscribers: 127, growth: -2.4 },
  ],
};

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

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
const getActivityIcon = (type: Activity['type']): React.ComponentType<{ className?: string }> => {
  switch (type) {
    case 'new_subscriber':
      return ({ className }) => <Users className={cn('h-4 w-4 text-blue-600', className)} />;
    case 'waitlist_created':
      return ({ className }) => <Zap className={cn('h-4 w-4 text-green-600', className)} />;
    case 'referral':
      return ({ className }) => <Mail className={cn('h-4 w-4 text-purple-600', className)} />;
    case 'conversion':
      return ({ className }) => <DollarSign className={cn('h-4 w-4 text-green-600', className)} />;
    case 'milestone':
      return ({ className }) => <TrendingUp className={cn('h-4 w-4 text-orange-600', className)} />;
    default:
      const _exhaustiveCheck: never = type;
      return ({ className }) => <Bell className={cn('h-4 w-4 text-gray-600', className)} />;
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
const formatActivityMessage = (activity: Activity) => {
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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

/**
 * Renders a stat card component with title, value, icon, and optional trend indicators.
 *
 * This component displays a card containing a title, a main value, an icon,
 * and optionally shows a trend indicator if both `trend` and `trendValue` are provided.
 * The trend can be either 'up' or 'down', affecting the styling and icon used.
 */
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

/**
 * Renders an activity item with an icon, message, and timestamp.
 */
const ActivityItem = ({ activity }: { activity: Activity }) => {
  const IconComponent = getActivityIcon(activity.type);
  const message = formatActivityMessage(activity);

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
export default async function Page({ searchParams }: PageProps) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const isPremium = user.privateMetadata?.premium === true;
  const showUpgradeBanner = searchParams.upgrade === 'success';

  // Fetch waitlists with subscribers count
  const waitlists = await db.waitlist.findMany({
    where: {
      userId: user.id,
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
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Waitlist
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
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
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
              {stats.recentActivity.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                />
              ))}
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
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Subscriber Growth</span>
                  <span className="font-medium text-green-600">+15.8%</span>
                </div>
                <Progress
                  value={68}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Engagement</span>
                  <span className="font-medium text-blue-600">42%</span>
                </div>
                <Progress
                  value={42}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Conversion</span>
                  <span className="font-medium text-purple-600">68.5%</span>
                </div>
                <Progress
                  value={68.5}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2 h-10"
              >
                <Plus className="h-4 w-4" />
                Create Waitlist
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-10"
              >
                <Mail className="h-4 w-4" />
                Email Subscribers
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-10"
              >
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-10"
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlists.map((waitlist) => (
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
                            <Link href={`/dashboard/waitlists/${waitlist.id}`}>
                              View
                              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
    </div>
  );
}
