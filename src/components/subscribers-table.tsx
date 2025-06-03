'use client';

import React, { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  ChevronDown,
  MoreHorizontal,
  Mail,
  RefreshCw,
  Copy,
  Download,
  Check,
  X,
} from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: 'PENDING' | 'VERIFIED' | 'BOUNCED';
  referralCode: string | null;
  referredBy: string | null;
  customFields: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  waitlistId: string;
}

interface SubscribersTableProps {
  waitlistId: string;
}

export function SubscribersTable({ waitlistId }: SubscribersTableProps) {
  const queryClient = useQueryClient();

  // State for table controls
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // State for delete operations
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch subscribers data
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['subscribers', waitlistId, pagination],
    queryFn: async () => {
      const response = await fetch(
        `/api/waitlists/${waitlistId}/subscribers?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      return response.json();
    },
  });

  const { toast } = useToast();

  // Handle resend verification email
  const handleResendVerification = useCallback(
    async (email: string) => {
      if (!toast) return;
      try {
        const response = await fetch('/api/subscribers/resend-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to resend verification email');
        }

        toast({
          title: 'Email sent',
          description: 'Verification email has been resent',
        });
      } catch (error) {
        console.error('Error resending verification email:', error);
        toast({
          title: 'Error',
          description: 'Failed to resend verification email',
          variant: 'destructive',
        });
      }
    },
    [toast],
  );

  // Handle update subscriber status
  const handleUpdateStatus = useCallback(
    async (id: string, newStatus: 'PENDING' | 'VERIFIED' | 'BOUNCED') => {
      try {
        const response = await fetch(`/api/subscribers/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
          throw new Error('Failed to update subscriber status');
        }

        await queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] });

        toast({
          title: 'Status updated',
          description: `Subscriber status updated to ${newStatus.toLowerCase()}`,
        });
      } catch (error) {
        console.error('Error updating subscriber status:', error);
        toast({
          title: 'Error',
          description: 'Failed to update subscriber status',
          variant: 'destructive',
        });
      }
    },
    [queryClient, waitlistId, toast],
  );

  // Handle copy to clipboard
  const copyToClipboard = useCallback(
    (text: string, message: string) => {
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copied',
        description: message,
      });
    },
    [toast],
  );

  // Handle delete subscriber
  const handleDeleteSubscriber = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/subscribers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete subscriber');
        }

        // Invalidate the query to refetch the data
        await queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] });

        toast({
          title: 'Success',
          description: 'Subscriber deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete subscriber',
          variant: 'destructive',
        });
      } finally {
        setSubscriberToDelete(null);
        setDeleteDialogOpen(false);
      }
    },
    [queryClient, waitlistId],
  );

  // Handle export subscribers
  const handleExportSubscribers = useCallback(
    async (selectedOnly = false) => {
      try {
        const selectedIds = selectedOnly
          ? Object.keys(rowSelection).filter((key) => rowSelection[key] as boolean)
          : [];

        const response = await fetch('/api/subscribers/export', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            waitlistId,
            subscriberIds: selectedOnly ? selectedIds : undefined,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to export subscribers');
        }

        // Create a download link for the CSV file
        const blob = await response.blob();
        const contentDisposition = response.headers.get('content-disposition');
        const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
        const filename = filenameMatch
          ? filenameMatch[1]
          : `subscribers-${new Date().toISOString().split('T')[0]}.csv`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        toast({
          title: 'Export successful',
          description: selectedOnly
            ? `Exported ${selectedIds.length} subscribers`
            : 'Exported all subscribers',
        });
      } catch (error) {
        console.error('Error exporting subscribers:', error);
        toast({
          title: 'Export failed',
          description: 'Failed to export subscribers',
          variant: 'destructive',
        });
      }
    },
    [rowSelection, waitlistId, toast],
  );

  // Handle bulk delete
  const handleBulkDelete = useCallback(async () => {
    const selectedIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

    if (selectedIds.length === 0) {
      toast({
        title: 'No selection',
        description: 'Please select at least one subscriber to delete',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/subscribers/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete subscribers');
      }

      // Invalidate the query to refetch the data
      await queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] });

      // Clear row selection
      setRowSelection({});
      setBulkDeleteDialogOpen(false);

      const result = await response.json();

      toast({
        title: 'Success',
        description: `Deleted ${result.deletedCount} subscribers`,
      });
    } catch (error) {
      console.error('Error deleting subscribers:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete subscribers',
        variant: 'destructive',
      });
    }
  }, [rowSelection, queryClient, waitlistId]);

  // Define table columns
  const columns: ColumnDef<Subscriber>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(Boolean(value))}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(Boolean(value))}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="font-medium">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('name') || '-'}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'VERIFIED' ? 'default' : status === 'PENDING' ? 'outline' : 'destructive'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'referralCode',
      header: 'Referral Code',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('referralCode') || '-'}</div>
      ),
    },
    {
      accessorKey: 'referredBy',
      header: 'Referred By',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('referredBy') || '-'}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => <div>{format(new Date(row.getValue('createdAt')), 'MMM d, yyyy')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const subscriber = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56"
            >
              <DropdownMenuLabel>Subscriber Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => copyToClipboard(subscriber.email, 'Email copied to clipboard')}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy email</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleResendVerification(subscriber.email)}
                disabled={subscriber.status === 'VERIFIED'}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Resend verification</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Update status</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus(subscriber.id, 'PENDING')}
                      className={subscriber.status === 'PENDING' ? 'bg-accent' : ''}
                    >
                      <span className="flex items-center">
                        {subscriber.status === 'PENDING' && <Check className="mr-2 h-4 w-4" />}
                        <span>Pending</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus(subscriber.id, 'VERIFIED')}
                      className={subscriber.status === 'VERIFIED' ? 'bg-accent' : ''}
                    >
                      <span className="flex items-center">
                        {subscriber.status === 'VERIFIED' && <Check className="mr-2 h-4 w-4" />}
                        <span>Verified</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus(subscriber.id, 'BOUNCED')}
                      className={subscriber.status === 'BOUNCED' ? 'bg-accent' : ''}
                    >
                      <span className="flex items-center">
                        {subscriber.status === 'BOUNCED' && <Check className="mr-2 h-4 w-4" />}
                        <span>Bounced</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setSubscriberToDelete(subscriber);
                  setDeleteDialogOpen(true);
                }}
              >
                <X className="mr-2 h-4 w-4" />
                <span>Delete subscriber</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Initialize the table
  const table = useReactTable({
    data: subscribers?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    pageCount: Math.ceil((subscribers?.total || 0) / pagination.pageSize),
    manualPagination: true,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 py-4 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <div className="flex-1">
          <Input
            placeholder="Filter subscribers..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex space-x-2">
          {/* Export and delete buttons */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleExportSubscribers(true)}
                  disabled={Object.keys(rowSelection).length === 0}
                >
                  <span>Export selected ({Object.keys(rowSelection).length})</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportSubscribers(false)}>
                  <span>Export all</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {Object.keys(rowSelection).length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteDialogOpen(true)}
              >
                <X className="mr-2 h-4 w-4" />
                <span>Delete {Object.keys(rowSelection).length} selected</span>
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
              >
                <MoreHorizontal className="mr-2 h-4 w-4" />
                <span>View</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Table Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                onClick={() => {
                  // Export all subscribers logic
                  toast({
                    title: 'Exporting all subscribers',
                    description: 'Preparing export for all subscribers',
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Export All</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subscriber and all associated data. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => subscriberToDelete && handleDeleteSubscriber(subscriberToDelete.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirmation dialog */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected subscribers and all associated data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete {Object.keys(rowSelection).length} subscribers
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
