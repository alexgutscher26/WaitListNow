'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Eye, Copy, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { DashboardPage } from '@/components/dashboard-page';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Waitlist } from '@prisma/client';

type WaitlistWithCount = Waitlist & {
  _count: {
    subscribers: number;
  };
};

// Skeleton Loader Component
/**
 * Renders a waitlist skeleton UI component.
 */
const WaitlistSkeleton = () => (
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-64" />
        <div className="flex space-x-4">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
    <div className="flex space-x-2">
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-9 w-9" />
    </div>
  </div>
);

/**
 * WaitlistsPage component for displaying waitlist statistics and data.
 *
 * This component fetches waitlists from an API and displays various statistics such as total waitlists,
 * total subscribers, active waitlists, and the last updated date. It also renders a list of waitlists with options to view,
 * copy link, or delete each waitlist. If there are no waitlists, it provides a call-to-action to create a new one.
 *
 * @returns The WaitlistsPage component for rendering in the dashboard.
 */
export default function WaitlistsPage() {
  const {
    data: waitlists,
    isLoading,
    isError,
  } = useQuery<WaitlistWithCount[]>({
    queryKey: ['waitlists'],
    queryFn: async () => {
      const res = await fetch('/api/waitlists');
      if (!res.ok) {
        throw new Error('Failed to fetch waitlists');
      }
      return res.json();
    },
  });

  /**
   * Converts a date string to a US locale-specific format (e.g., "Jan 1, 2023").
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate stats
  const hasWaitlists = waitlists && waitlists.length > 0;
  const totalSubscribers = hasWaitlists
    ? waitlists.reduce((sum, wl) => sum + wl._count.subscribers, 0)
    : 0;
  const activeWaitlists = hasWaitlists
    ? waitlists.filter((wl) => wl.status === 'ACTIVE').length
    : 0;
  const lastUpdated =
    hasWaitlists && waitlists[0]?.updatedAt
      ? formatDate(waitlists[0].updatedAt.toString())
      : formatDate(new Date().toISOString());

  if (isError) {
    return (
      <DashboardPage
        title="Waitlists"
        cta={
          <Button asChild>
            <Link href="/dashboard/waitlists/new">
              <Plus className="mr-2 h-4 w-4" />
              New Waitlist
            </Link>
          </Button>
        }
      >
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <div className="rounded-full bg-muted p-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No waitlists yet</h3>
          <p className="text-muted-foreground">
            Get started by creating your first waitlist to collect subscribers.
          </p>
          <Button asChild>
            <Link href="/dashboard/waitlists/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Waitlist
            </Link>
          </Button>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title="Waitlists"
      cta={
        <Button asChild>
          <Link href="/dashboard/waitlists/new">
            <Plus className="mr-2 h-4 w-4" />
            New Waitlist
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Waitlists</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{waitlists?.length || 0}</div>
              )}
              <div className="text-xs text-muted-foreground">
                {isLoading ? <Skeleton className="mt-2 h-4 w-32" /> : 'All your waitlists'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{totalSubscribers.toLocaleString()}</div>
              )}
              <div className="text-xs text-muted-foreground">
                {isLoading ? <Skeleton className="mt-2 h-4 w-32" /> : 'Across all waitlists'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{activeWaitlists}</div>
              )}
              <div className="text-xs text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="mt-2 h-4 w-32" />
                ) : waitlists?.length ? (
                  `${Math.round((activeWaitlists / (waitlists?.length || 1)) * 100)}% of total`
                ) : (
                  'No waitlists yet'
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <span className="h-4 w-4 text-muted-foreground">🔄</span>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold">{lastUpdated}</div>
              )}
              <div className="text-xs text-muted-foreground">
                {isLoading ? <Skeleton className="mt-2 h-4 w-20" /> : 'Last activity'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waitlists List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Waitlists</CardTitle>
                <CardDescription>
                  {hasWaitlists
                    ? 'Manage your waitlists and view subscriber analytics'
                    : 'Create your first waitlist to start collecting subscribers'}
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/waitlists/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Waitlist
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <WaitlistSkeleton key={i} />
                ))}
              </div>
            ) : hasWaitlists ? (
              <div className="space-y-4">
                {waitlists.map((waitlist) => (
                  <div
                    key={waitlist.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{waitlist.name}</h3>
                          <Badge variant={waitlist.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {waitlist.status.charAt(0) + waitlist.status.slice(1).toLowerCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {waitlist._count.subscribers} subscribers • Created{' '}
                          {formatDate(waitlist.createdAt.toString())}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                <div className="rounded-full bg-muted p-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No waitlists yet</h3>
                <p className="text-muted-foreground">
                  Get started by creating your first waitlist to collect subscribers.
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
    </DashboardPage>
  );
}
