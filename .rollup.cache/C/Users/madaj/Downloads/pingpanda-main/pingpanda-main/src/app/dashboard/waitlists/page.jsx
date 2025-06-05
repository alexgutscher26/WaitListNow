'use client';
import { __awaiter, __generator, __spreadArray } from 'tslib';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Eye, Copy, Trash2, MoreVertical, AlertCircle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { DashboardPage } from '@/components/dashboard-page';
// Renders a waitlist skeleton UI component with loading placeholders.
function WaitlistSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(function (i) {
        return (
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
        );
      })}
    </div>
  );
}
function deleteWaitlist(id) {
  return __awaiter(this, void 0, void 0, function () {
    var res, error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch('/api/waitlists/'.concat(id), {
              method: 'DELETE',
            }),
          ];
        case 1:
          res = _a.sent();
          if (res.ok) return [3 /*break*/, 3];
          return [4 /*yield*/, res.json()];
        case 2:
          error = _a.sent();
          throw new Error(error.message || 'Failed to delete waitlist');
        case 3:
          return [4 /*yield*/, res.json()];
        case 4:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
export default function WaitlistsPage() {
  var _this = this;
  var toast = useToast().toast;
  var router = useRouter();
  var queryClient = useQueryClient();
  // Fetch waitlists with proper typing and error handling
  var _a = useQuery({
      queryKey: ['waitlists'],
      queryFn: function () {
        return __awaiter(_this, void 0, void 0, function () {
          var res, errorText, errorData, data;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  fetch('/api/waitlists', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-store',
                    credentials: 'include',
                  }),
                ];
              case 1:
                res = _a.sent();
                if (res.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, res.text()];
              case 2:
                errorText = _a.sent();
                console.error('[WaitlistsPage] Error response:', errorText);
                errorData = void 0;
                try {
                  errorData = JSON.parse(errorText);
                } catch (_b) {
                  errorData = { message: 'Failed to parse error response' };
                }
                throw new Error(
                  errorData.message ||
                    'Failed to fetch waitlists ('
                      .concat(res.status, ' ')
                      .concat(res.statusText, ')'),
                );
              case 3:
                return [4 /*yield*/, res.json()];
              case 4:
                data = _a.sent();
                // console.log('[WaitlistsPage] Raw API response:', data);
                if (!Array.isArray(data)) {
                  console.error('[WaitlistsPage] Invalid response format:', data);
                  throw new Error('Invalid response format from server: expected an array');
                }
                // console.log(`[WaitlistsPage] Successfully fetched ${data.length} waitlists`);
                return [2 /*return*/, data];
            }
          });
        });
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 1500,
    }),
    _b = _a.data,
    waitlists = _b === void 0 ? [] : _b,
    isLoading = _a.isLoading,
    isError = _a.isError,
    error = _a.error,
    refetch = _a.refetch;
  // Delete mutation
  var deleteMutation = useMutation({
    mutationFn: deleteWaitlist,
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['waitlists'] });
      toast({
        title: 'Success',
        description: 'Waitlist deleted successfully',
      });
    },
    onError: function (error) {
      console.error('Error deleting waitlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete waitlist',
        variant: 'destructive',
      });
    },
  });
  var updateStatusMutation = useMutation({
    mutationFn: function (_a) {
      return __awaiter(_this, [_a], void 0, function (_b) {
        var response, error_1;
        var id = _b.id,
          status = _b.status;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              return [
                4 /*yield*/,
                fetch('/api/waitlists/'.concat(id), {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: status }),
                }),
              ];
            case 1:
              response = _c.sent();
              if (response.ok) return [3 /*break*/, 3];
              return [4 /*yield*/, response.json()];
            case 2:
              error_1 = _c.sent();
              throw new Error(error_1.error || 'Failed to update status');
            case 3:
              return [2 /*return*/, response.json()];
          }
        });
      });
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['waitlists'] });
      toast({
        title: 'Success',
        description: 'Waitlist status updated successfully',
      });
    },
    onError: function (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    },
  });
  var handleStatusChange = function (id, newStatus) {
    updateStatusMutation.mutate({ id: id, status: newStatus });
  };
  // Copy to clipboard function
  var copyToClipboard = function (text) {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Link copied to clipboard',
      variant: 'default',
    });
  };
  // Format date helper with proper type checking
  var formatDate = function (dateInput) {
    if (!dateInput) return 'N/A';
    try {
      var date = dateInput instanceof Date ? dateInput : new Date(dateInput);
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
  var safeWaitlists = (function () {
    if (!Array.isArray(waitlists)) {
      console.error('[WaitlistsPage] waitlists is not an array:', waitlists);
      return [];
    }
    var filtered = waitlists.filter(function (wl) {
      var isValid =
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
  var hasWaitlists = safeWaitlists.length > 0;
  // console.log(`[WaitlistsPage] hasWaitlists: ${hasWaitlists} (${safeWaitlists.length} waitlists)`);
  // Calculate total subscribers safely
  var totalSubscribers = safeWaitlists.reduce(function (sum, wl) {
    var _a;
    try {
      var subscribers = (_a = wl._count) === null || _a === void 0 ? void 0 : _a.subscribers;
      return sum + (typeof subscribers === 'number' ? subscribers : 0);
    } catch (error) {
      console.error('Error calculating subscribers:', error);
      return sum;
    }
  }, 0);
  // Count active waitlists
  var activeWaitlists = safeWaitlists.filter(function (wl) {
    return wl.status === 'ACTIVE';
  }).length;
  // Get the most recent update time with proper type checking
  var lastUpdated = (function () {
    var _a;
    if (!hasWaitlists) return formatDate(new Date());
    try {
      var sorted = __spreadArray([], safeWaitlists, true)
        .filter(function (wl) {
          return wl.updatedAt;
        })
        .sort(function (a, b) {
          var dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          var dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        });
      var mostRecent = (_a = sorted[0]) === null || _a === void 0 ? void 0 : _a.updatedAt;
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
            {(error === null || error === void 0 ? void 0 : error.message) ||
              'An unknown error occurred'}
          </p>
          <Button
            variant="outline"
            onClick={function () {
              return refetch();
            }}
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
                <div className="text-2xl font-bold">
                  {(waitlists === null || waitlists === void 0 ? void 0 : waitlists.length) || 0}
                </div>
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
                ) : (waitlists === null || waitlists === void 0 ? void 0 : waitlists.length) ? (
                  ''.concat(
                    Math.round(
                      (activeWaitlists /
                        ((waitlists === null || waitlists === void 0 ? void 0 : waitlists.length) ||
                          1)) *
                        100,
                    ),
                    '% of total',
                  )
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
                {__spreadArray([], Array(3), true).map(function (_, i) {
                  return <WaitlistSkeleton key={i} />;
                })}
              </div>
            ) : hasWaitlists ? (
              <div className="space-y-4">
                {waitlists.map(function (waitlist) {
                  return (
                    <div
                      key={waitlist.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={function () {
                        return router.push('/dashboard/waitlists/'.concat(waitlist.id));
                      }}
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
                            onClick={function (e) {
                              return e.stopPropagation();
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48"
                        >
                          <DropdownMenuItem
                            onClick={function (e) {
                              e.stopPropagation();
                              router.push('/dashboard/waitlists/'.concat(waitlist.id));
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={function (e) {
                              e.stopPropagation();
                              var waitlistUrl = ''
                                .concat(window.location.origin, '/waitlist/')
                                .concat(waitlist.slug);
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
                                {['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED'].map(function (status) {
                                  return (
                                    <DropdownMenuItem
                                      key={status}
                                      className={status === waitlist.status ? 'bg-accent' : ''}
                                      onClick={function (e) {
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
                                  );
                                })}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={function (e) {
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
                  );
                })}
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
//# sourceMappingURL=page.jsx.map
