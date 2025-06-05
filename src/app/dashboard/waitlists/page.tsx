/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-default-export */
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Users, Eye, Copy, Trash2, MoreVertical, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { DashboardPage } from '@/components/dashboard-page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

// Define the Waitlist type based on the Prisma model
type Waitlist = {
  id: string;
  name: string;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  slug: string;
  description: string | null;
  websiteUrl: string | null;
  redirectUrl: string | null;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type WaitlistWithCount = Waitlist & {
  _count: {
    subscribers: number;
  };
};

// API response type for better type safety
type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

// Renders a waitlist skeleton UI component with loading placeholders.
function WaitlistSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="animate-pulse"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function deleteWaitlist(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/waitlists/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete waitlist');
  }

  return await res.json();
}

/**
 * Represents a React component that renders the Waitlists page in a dashboard application.
 * This component fetches and displays waitlist data, allows users to manage waitlists,
 * and provides options to create new waitlists, view details, copy links, change status,
 * and delete waitlists.
 *
 * @component
 * @name WaitlistsPage
 * @extends {React.Component}
 * @param {Object} props - The component's properties.
 * @param {Function} props.router - A router object for navigation.
 * @param {Function} props.useQuery - A hook for fetching data with GraphQL queries.
 * @returns {JSX.Element} - The rendered Waitlists page component.
 */
export default function WaitlistsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch waitlists with proper typing and error handling
  const {
    data: waitlists = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WaitlistWithCount[]>({
    queryKey: ['waitlists'],
    queryFn: async (): Promise<WaitlistWithCount[]> => {
      // console.log('[WaitlistsPage] Fetching waitlists...');
      const res = await fetch('/api/waitlists', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        credentials: 'include',
      });

      // console.log('[WaitlistsPage] Response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('[WaitlistsPage] Error response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: 'Failed to parse error response' };
        }
        throw new Error(
          errorData.message || `Failed to fetch waitlists (${res.status} ${res.statusText})`,
        );
      }

      const data = await res.json();
      // console.log('[WaitlistsPage] Raw API response:', data);

      if (!Array.isArray(data)) {
        console.error('[WaitlistsPage] Invalid response format:', data);
        throw new Error('Invalid response format from server: expected an array');
      }

      // console.log(`[WaitlistsPage] Successfully fetched ${data.length} waitlists`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
    retryDelay: 1500,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteWaitlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlists'] });
      toast({
        title: 'Success',
        description: 'Waitlist deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting waitlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete waitlist',
        variant: 'destructive',
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/waitlists/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlists'] });
      toast({
        title: 'Success',
        description: 'Waitlist status updated successfully',
      });
    },
    onError: (error: Error) => {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    },
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Link copied to clipboard',
      variant: 'default',
    });
  };

  // Format date helper with proper type checking
  const formatDate = (dateInput: string | Date | null | undefined): string => {
    if (!dateInput) return 'N/A';

    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date provided to formatDate:', dateInput);
        return 'Invalid date';
      }

      // Format the date
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error, 'Input:', dateInput);
      return 'Invalid date';
    }
  };

  // Ensure waitlists is always an array and properly typed
  const safeWaitlists: WaitlistWithCount[] = (() => {
    if (!Array.isArray(waitlists)) {
      console.error('[WaitlistsPage] waitlists is not an array:', waitlists);
      return [];
    }

    const filtered = waitlists.filter((wl): wl is WaitlistWithCount => {
      const isValid =
        wl !== null &&
        typeof wl === 'object' &&
        'id' in wl &&
        '_count' in wl &&
        wl._count !== null &&
        typeof wl._count === 'object' &&
        'subscribers' in wl._count;

      if (!isValid) {
        console.warn('[WaitlistsPage] Invalid waitlist item:', wl);
      }

      return isValid;
    });

    // console.log(
    //    `[WaitlistsPage] Filtered ${filtered.length} valid waitlists out of ${waitlists.length}`,
    // );
    return filtered;
  })();

  const hasWaitlists = safeWaitlists.length > 0;
  // console.log(`[WaitlistsPage] hasWaitlists: ${hasWaitlists} (${safeWaitlists.length} waitlists)`);

  // Calculate total subscribers safely
  const totalSubscribers = safeWaitlists.reduce<number>((sum, wl) => {
    try {
      const subscribers = wl._count?.subscribers;
      return sum + (typeof subscribers === 'number' ? subscribers : 0);
    } catch (error) {
      console.error('Error calculating subscribers:', error);
      return sum;
    }
  }, 0);

  // Count active waitlists
  const activeWaitlists = safeWaitlists.filter((wl) => wl.status === 'ACTIVE').length;

  // Get the most recent update time with proper type checking
  const lastUpdated = (() => {
    if (!hasWaitlists) return formatDate(new Date());

    try {
      const sorted = [...safeWaitlists]
        .filter((wl) => wl.updatedAt)
        .sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        });

      const mostRecent = sorted[0]?.updatedAt;
      return mostRecent ? formatDate(mostRecent) : formatDate(new Date());
    } catch (error) {
      console.error('Error determining last updated date:', error);
      return formatDate(new Date());
    }
  })();

  // Handle error state with retry button
  if (isError) {
    return (
      <DashboardPage
        title="Waitlists"
        description="Manage your waitlists"
        actions={
          <Button asChild>
            <Link href="/dashboard/waitlists/new">
              <Plus className="mr-2 h-4 w-4" />
              New Waitlist
            </Link>
          </Button>
        }
      >
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium">Failed to load waitlists</h3>
          <p className="text-sm text-muted-foreground">
            {error?.message || 'An unknown error occurred'}
          </p>
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </DashboardPage>
    );
  }

  // Handle empty state
  if (!isLoading && (!waitlists || waitlists.length === 0)) {
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
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div
                    key={waitlist.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/dashboard/waitlists/${waitlist.id}`)}
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48"
                      >
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/waitlists/${waitlist.id}`);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            const waitlistUrl = `${window.location.origin}/waitlist/${waitlist.slug}`;
                            copyToClipboard(waitlistUrl);
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="cursor-pointer">
                            <span className="flex items-center">
                              <span
                                className="mr-2 h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    waitlist.status === 'ACTIVE'
                                      ? '#10B981'
                                      : waitlist.status === 'PAUSED'
                                        ? '#F59E0B'
                                        : waitlist.status === 'ARCHIVED'
                                          ? '#6B7280'
                                          : '#9CA3AF',
                                }}
                              />
                              Status:{' '}
                              {waitlist.status.charAt(0) + waitlist.status.slice(1).toLowerCase()}
                            </span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED'].map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  className={status === waitlist.status ? 'bg-accent' : ''}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (status !== waitlist.status) {
                                      handleStatusChange(waitlist.id, status);
                                    }
                                  }}
                                >
                                  <span className="flex items-center">
                                    <span
                                      className="mr-2 h-2 w-2 rounded-full"
                                      style={{
                                        backgroundColor:
                                          status === 'ACTIVE'
                                            ? '#10B981'
                                            : status === 'PAUSED'
                                              ? '#F59E0B'
                                              : status === 'ARCHIVED'
                                                ? '#6B7280'
                                                : '#9CA3AF',
                                      }}
                                    />
                                    {status.charAt(0) + status.slice(1).toLowerCase()}
                                  </span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                'Are you sure you want to delete this waitlist? This action cannot be undone.',
                              )
                            ) {
                              deleteMutation.mutate(waitlist.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? (
                            <>
                              <span className="mr-2 h-4 w-4 animate-spin">↻</span>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </>
                          )}
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
