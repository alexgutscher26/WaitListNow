'use client';
import { __awaiter, __generator, __spreadArray } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronDown, MoreHorizontal, Mail, RefreshCw, Copy, Download, Check, X, } from 'lucide-react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
export function SubscribersTable(_a) {
    var _this = this;
    var _b, _c, _d;
    var waitlistId = _a.waitlistId;
    var queryClient = useQueryClient();
    // State for table controls
    var _e = useState([]), sorting = _e[0], setSorting = _e[1];
    var _f = useState([]), columnFilters = _f[0], setColumnFilters = _f[1];
    var _g = useState({}), columnVisibility = _g[0], setColumnVisibility = _g[1];
    var _h = useState({}), rowSelection = _h[0], setRowSelection = _h[1];
    // State for delete operations
    var _j = useState(false), deleteDialogOpen = _j[0], setDeleteDialogOpen = _j[1];
    var _k = useState(null), subscriberToDelete = _k[0], setSubscriberToDelete = _k[1];
    var _l = useState(false), bulkDeleteDialogOpen = _l[0], setBulkDeleteDialogOpen = _l[1];
    // Pagination state
    var _m = useState({
        pageIndex: 0,
        pageSize: 10,
    }), pagination = _m[0], setPagination = _m[1];
    // Fetch subscribers data
    var _o = useQuery({
        queryKey: ['subscribers', waitlistId, pagination],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId, "/subscribers?page=").concat(pagination.pageIndex + 1, "&limit=").concat(pagination.pageSize))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to fetch subscribers');
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
    }), subscribers = _o.data, isLoading = _o.isLoading;
    var toast = useToast().toast;
    // Handle resend verification email
    var handleResendVerification = useCallback(function (email) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!toast)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/subscribers/resend-verification', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: email }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to resend verification email');
                    }
                    toast({
                        title: 'Email sent',
                        description: 'Verification email has been resent',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error resending verification email:', error_1);
                    toast({
                        title: 'Error',
                        description: 'Failed to resend verification email',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [toast]);
    // Handle update subscriber status
    var handleUpdateStatus = useCallback(function (id, newStatus) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/subscribers/".concat(id), {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ status: newStatus }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update subscriber status');
                    }
                    return [4 /*yield*/, queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] })];
                case 2:
                    _a.sent();
                    toast({
                        title: 'Status updated',
                        description: "Subscriber status updated to ".concat(newStatus.toLowerCase()),
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error updating subscriber status:', error_2);
                    toast({
                        title: 'Error',
                        description: 'Failed to update subscriber status',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [queryClient, waitlistId, toast]);
    // Handle copy to clipboard
    var copyToClipboard = useCallback(function (text, message) {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied',
            description: message,
        });
    }, [toast]);
    // Handle delete subscriber
    var handleDeleteSubscriber = useCallback(function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch("/api/subscribers/".concat(id), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete subscriber');
                    }
                    // Invalidate the query to refetch the data
                    return [4 /*yield*/, queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] })];
                case 2:
                    // Invalidate the query to refetch the data
                    _a.sent();
                    toast({
                        title: 'Success',
                        description: 'Subscriber deleted successfully',
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error deleting subscriber:', error_3);
                    toast({
                        title: 'Error',
                        description: 'Failed to delete subscriber',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setSubscriberToDelete(null);
                    setDeleteDialogOpen(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [queryClient, waitlistId]);
    // Handle export subscribers
    var handleExportSubscribers = useCallback(function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (selectedOnly) {
            var selectedIds, response, blob, contentDisposition, filenameMatch, filename, url, a, error_4;
            if (selectedOnly === void 0) { selectedOnly = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        selectedIds = selectedOnly
                            ? Object.keys(rowSelection).filter(function (key) { return rowSelection[key]; })
                            : [];
                        return [4 /*yield*/, fetch('/api/subscribers/export', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    waitlistId: waitlistId,
                                    subscriberIds: selectedOnly ? selectedIds : undefined,
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to export subscribers');
                        }
                        return [4 /*yield*/, response.blob()];
                    case 2:
                        blob = _a.sent();
                        contentDisposition = response.headers.get('content-disposition');
                        filenameMatch = contentDisposition === null || contentDisposition === void 0 ? void 0 : contentDisposition.match(/filename="?([^"]+)"?/);
                        filename = filenameMatch
                            ? filenameMatch[1]
                            : "subscribers-".concat(new Date().toISOString().split('T')[0], ".csv");
                        url = window.URL.createObjectURL(blob);
                        a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        a.remove();
                        toast({
                            title: 'Export successful',
                            description: selectedOnly
                                ? "Exported ".concat(selectedIds.length, " subscribers")
                                : 'Exported all subscribers',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Error exporting subscribers:', error_4);
                        toast({
                            title: 'Export failed',
                            description: 'Failed to export subscribers',
                            variant: 'destructive',
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [rowSelection, waitlistId, toast]);
    // Handle bulk delete
    var handleBulkDelete = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var selectedIds, response, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectedIds = Object.keys(rowSelection).filter(function (key) { return rowSelection[key]; });
                    if (selectedIds.length === 0) {
                        toast({
                            title: 'No selection',
                            description: 'Please select at least one subscriber to delete',
                            variant: 'destructive',
                        });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/subscribers/bulk-delete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ids: selectedIds,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete subscribers');
                    }
                    // Invalidate the query to refetch the data
                    return [4 /*yield*/, queryClient.invalidateQueries({ queryKey: ['subscribers', waitlistId] })];
                case 3:
                    // Invalidate the query to refetch the data
                    _a.sent();
                    // Clear row selection
                    setRowSelection({});
                    setBulkDeleteDialogOpen(false);
                    return [4 /*yield*/, response.json()];
                case 4:
                    result = _a.sent();
                    toast({
                        title: 'Success',
                        description: "Deleted ".concat(result.deletedCount, " subscribers"),
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.error('Error deleting subscribers:', error_5);
                    toast({
                        title: 'Error',
                        description: 'Failed to delete subscribers',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [rowSelection, queryClient, waitlistId]);
    // Define table columns
    var columns = [
        {
            id: 'select',
            header: function (_a) {
                var table = _a.table;
                return (_jsx(Checkbox, { checked: table.getIsAllPageRowsSelected(), onCheckedChange: function (value) { return table.toggleAllPageRowsSelected(Boolean(value)); }, "aria-label": "Select all" }));
            },
            cell: function (_a) {
                var row = _a.row;
                return (_jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: function (value) { return row.toggleSelected(Boolean(value)); }, "aria-label": "Select row" }));
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: function (_a) {
                var row = _a.row;
                return _jsx("div", { className: "font-medium", children: row.getValue('email') });
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: function (_a) {
                var row = _a.row;
                return _jsx("div", { children: row.getValue('name') || '-' });
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: function (_a) {
                var row = _a.row;
                var status = row.getValue('status');
                return (_jsx(Badge, { variant: status === 'VERIFIED' ? 'default' : status === 'PENDING' ? 'outline' : 'destructive', children: status }));
            },
        },
        {
            accessorKey: 'referralCode',
            header: 'Referral Code',
            cell: function (_a) {
                var row = _a.row;
                return (_jsx("div", { className: "font-mono text-sm", children: row.getValue('referralCode') || '-' }));
            },
        },
        {
            accessorKey: 'referredBy',
            header: 'Referred By',
            cell: function (_a) {
                var row = _a.row;
                return (_jsx("div", { className: "font-mono text-sm", children: row.getValue('referredBy') || '-' }));
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Joined',
            cell: function (_a) {
                var row = _a.row;
                return _jsx("div", { children: format(new Date(row.getValue('createdAt')), 'MMM d, yyyy') });
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: function (_a) {
                var row = _a.row;
                var subscriber = row.original;
                return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "Subscriber Actions" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: function () { return copyToClipboard(subscriber.email, 'Email copied to clipboard'); }, children: [_jsx(Copy, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Copy email" })] }), _jsxs(DropdownMenuItem, { onClick: function () { return handleResendVerification(subscriber.email); }, disabled: subscriber.status === 'VERIFIED', children: [_jsx(Mail, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Resend verification" })] }), _jsxs(DropdownMenuSub, { children: [_jsxs(DropdownMenuSubTrigger, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Update status" })] }), _jsx(DropdownMenuPortal, { children: _jsxs(DropdownMenuSubContent, { children: [_jsx(DropdownMenuItem, { onClick: function () { return handleUpdateStatus(subscriber.id, 'PENDING'); }, className: subscriber.status === 'PENDING' ? 'bg-accent' : '', children: _jsxs("span", { className: "flex items-center", children: [subscriber.status === 'PENDING' && _jsx(Check, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Pending" })] }) }), _jsx(DropdownMenuItem, { onClick: function () { return handleUpdateStatus(subscriber.id, 'VERIFIED'); }, className: subscriber.status === 'VERIFIED' ? 'bg-accent' : '', children: _jsxs("span", { className: "flex items-center", children: [subscriber.status === 'VERIFIED' && _jsx(Check, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Verified" })] }) }), _jsx(DropdownMenuItem, { onClick: function () { return handleUpdateStatus(subscriber.id, 'BOUNCED'); }, className: subscriber.status === 'BOUNCED' ? 'bg-accent' : '', children: _jsxs("span", { className: "flex items-center", children: [subscriber.status === 'BOUNCED' && _jsx(Check, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Bounced" })] }) })] }) })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600", onClick: function () {
                                        setSubscriberToDelete(subscriber);
                                        setDeleteDialogOpen(true);
                                    }, children: [_jsx(X, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Delete subscriber" })] })] })] }));
            },
        },
    ];
    // Initialize the table
    var table = useReactTable({
        data: (subscribers === null || subscribers === void 0 ? void 0 : subscribers.data) || [],
        columns: columns,
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
            sorting: sorting,
            columnFilters: columnFilters,
            columnVisibility: columnVisibility,
            rowSelection: rowSelection,
            pagination: pagination,
        },
        pageCount: Math.ceil(((subscribers === null || subscribers === void 0 ? void 0 : subscribers.total) || 0) / pagination.pageSize),
        manualPagination: true,
    });
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-col space-y-4 py-4 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "Filter subscribers...", value: (_c = (_b = table.getColumn('email')) === null || _b === void 0 ? void 0 : _b.getFilterValue()) !== null && _c !== void 0 ? _c : '', onChange: function (event) { var _a; return (_a = table.getColumn('email')) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "max-w-sm" }) }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Export" }), _jsx(ChevronDown, { className: "ml-2 h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: function () { return handleExportSubscribers(true); }, disabled: Object.keys(rowSelection).length === 0, children: _jsxs("span", { children: ["Export selected (", Object.keys(rowSelection).length, ")"] }) }), _jsx(DropdownMenuItem, { onClick: function () { return handleExportSubscribers(false); }, children: _jsx("span", { children: "Export all" }) })] })] }), Object.keys(rowSelection).length > 0 && (_jsxs(Button, { variant: "destructive", onClick: function () { return setBulkDeleteDialogOpen(true); }, children: [_jsx(X, { className: "mr-2 h-4 w-4" }), _jsxs("span", { children: ["Delete ", Object.keys(rowSelection).length, " selected"] })] }))] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "ml-auto", children: [_jsx(MoreHorizontal, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "View" }), _jsx(ChevronDown, { className: "ml-2 h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Table Options" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuSub, { children: [_jsx(DropdownMenuSubTrigger, { children: "Columns" }), _jsx(DropdownMenuPortal, { children: _jsx(DropdownMenuSubContent, { children: table
                                                                .getAllColumns()
                                                                .filter(function (column) { return column.getCanHide(); })
                                                                .map(function (column) { return (_jsx(DropdownMenuCheckboxItem, { className: "capitalize", checked: column.getIsVisible(), onCheckedChange: function (value) { return column.toggleVisibility(Boolean(value)); }, children: column.id }, column.id)); }) }) })] }), _jsxs(DropdownMenuItem, { onClick: function () {
                                                    // Export all subscribers logic
                                                    toast({
                                                        title: 'Exporting all subscribers',
                                                        description: 'Preparing export for all subscribers',
                                                    });
                                                }, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Export All" })] })] })] })] })] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map(function (headerGroup) { return (_jsx(TableRow, { children: headerGroup.headers.map(function (header) { return (_jsx(TableHead, { children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }, header.id)); }) }, headerGroup.id)); }) }), _jsx(TableBody, { children: ((_d = table.getRowModel().rows) === null || _d === void 0 ? void 0 : _d.length) ? (table.getRowModel().rows.map(function (row) { return (_jsx(TableRow, { "data-state": row.getIsSelected() && 'selected', children: row.getVisibleCells().map(function (cell) { return (_jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)); }) }, row.id)); })) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: isLoading ? 'Loading...' : 'No results.' }) })) })] }) }), _jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [_jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [table.getFilteredSelectedRowModel().rows.length, " of", ' ', table.getFilteredRowModel().rows.length, " row(s) selected."] }), _jsxs("div", { className: "space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: function () { return table.previousPage(); }, disabled: !table.getCanPreviousPage(), children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", onClick: function () { return table.nextPage(); }, disabled: !table.getCanNextPage(), children: "Next" })] })] }), _jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure?" }), _jsx(AlertDialogDescription, { children: "This will permanently delete the subscriber and all associated data. This action cannot be undone." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: function () { return subscriberToDelete && handleDeleteSubscriber(subscriberToDelete.id); }, className: "bg-red-600 hover:bg-red-700", children: "Delete" })] })] }) }), _jsx(AlertDialog, { open: bulkDeleteDialogOpen, onOpenChange: setBulkDeleteDialogOpen, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure?" }), _jsx(AlertDialogDescription, { children: "This will permanently delete the selected subscribers and all associated data. This action cannot be undone." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsxs(AlertDialogAction, { onClick: handleBulkDelete, className: "bg-red-600 hover:bg-red-700", children: ["Delete ", Object.keys(rowSelection).length, " subscribers"] })] })] }) })] }));
}
//# sourceMappingURL=subscribers-table.js.map