'use client';
import { __awaiter, __generator } from 'tslib';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, Edit, Link as LinkIcon, Trash } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
var WaitlistTable = function (_a) {
  var waitlists = _a.waitlists;
  var _b = useState(waitlists),
    waitlistsState = _b[0],
    setWaitlistsState = _b[1];
  var _c = useState(null),
    deletingId = _c[0],
    setDeletingId = _c[1];
  var _d = useState(null),
    pendingDelete = _d[0],
    setPendingDelete = _d[1];
  var handleCopyLink = function (id) {
    navigator.clipboard.writeText(''.concat(window.location.origin, '/waitlist/').concat(id));
    toast.success('Waitlist link copied to clipboard.');
  };
  var handleDelete = function (id) {
    setPendingDelete(id);
  };
  var confirmDelete = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var res, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!pendingDelete) return [2 /*return*/];
            setDeletingId(pendingDelete);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              fetch('/api/waitlists/'.concat(pendingDelete), { method: 'DELETE' }),
            ];
          case 2:
            res = _a.sent();
            if (!res.ok) throw new Error('Failed to delete waitlist');
            setWaitlistsState(function (prev) {
              return prev.filter(function (w) {
                return w.id !== pendingDelete;
              });
            });
            toast.success('Waitlist deleted successfully.');
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            toast.error('Failed to delete waitlist.');
            return [3 /*break*/, 5];
          case 4:
            setDeletingId(null);
            setPendingDelete(null);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return _jsxs('div', {
    className: 'overflow-hidden rounded-lg border',
    children: [
      _jsxs(Table, {
        children: [
          _jsx(TableHeader, {
            children: _jsxs(TableRow, {
              children: [
                _jsx(TableHead, { children: 'Name' }),
                _jsx(TableHead, { children: 'Subscribers' }),
                _jsx(TableHead, { children: 'Created' }),
                _jsx(TableHead, { children: 'Status' }),
              ],
            }),
          }),
          _jsx(TableBody, {
            children: waitlistsState.map(function (waitlist) {
              return _jsxs(
                TableRow,
                {
                  children: [
                    _jsx(TableCell, {
                      className: 'font-medium',
                      children: _jsxs('div', {
                        className: 'flex items-center gap-3',
                        children: [
                          _jsx('div', {
                            className:
                              'h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center',
                            children: _jsx(Users, { className: 'h-5 w-5 text-brand-600' }),
                          }),
                          _jsxs('div', {
                            children: [
                              _jsx('p', { className: 'font-medium', children: waitlist.name }),
                              _jsxs('p', {
                                className: 'text-sm text-muted-foreground',
                                children: [waitlist.subscribers, ' subscribers'],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    _jsx(TableCell, {
                      children: _jsx(ClientDate, { dateString: waitlist.createdAt }),
                    }),
                    _jsx(TableCell, {
                      children: _jsx(Badge, {
                        variant: 'outline',
                        className: 'text-xs bg-green-50 text-green-700',
                        children: 'Active',
                      }),
                    }),
                    _jsx(TableCell, {
                      children: _jsxs(DropdownMenu, {
                        children: [
                          _jsx(DropdownMenuTrigger, {
                            asChild: true,
                            children: _jsx(Button, {
                              variant: 'ghost',
                              size: 'icon',
                              children: _jsx(MoreHorizontal, { className: 'h-5 w-5' }),
                            }),
                          }),
                          _jsxs(DropdownMenuContent, {
                            align: 'end',
                            children: [
                              _jsx(DropdownMenuItem, {
                                asChild: true,
                                children: _jsxs(Link, {
                                  href: '/dashboard/waitlists/'.concat(waitlist.id, '/edit'),
                                  children: [_jsx(Edit, { className: 'mr-2 h-4 w-4' }), ' Edit'],
                                }),
                              }),
                              _jsxs(DropdownMenuItem, {
                                onClick: function () {
                                  return handleCopyLink(waitlist.id);
                                },
                                children: [
                                  _jsx(LinkIcon, { className: 'mr-2 h-4 w-4' }),
                                  ' Copy Link',
                                ],
                              }),
                              _jsxs(DropdownMenuItem, {
                                onClick: function () {
                                  return handleDelete(waitlist.id);
                                },
                                className: 'text-red-600',
                                disabled: deletingId === waitlist.id,
                                children: [
                                  _jsx(Trash, { className: 'mr-2 h-4 w-4' }),
                                  deletingId === waitlist.id ? 'Deleting...' : 'Delete',
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                },
                waitlist.id,
              );
            }),
          }),
        ],
      }),
      _jsx(Dialog, {
        open: !!pendingDelete,
        onOpenChange: function (open) {
          return !open && setPendingDelete(null);
        },
        children: _jsxs(DialogContent, {
          children: [
            _jsxs(DialogHeader, {
              children: [
                _jsx(DialogTitle, { children: 'Delete Waitlist' }),
                _jsx(DialogDescription, {
                  children:
                    'Are you sure you want to delete this waitlist? This action cannot be undone.',
                }),
              ],
            }),
            _jsxs(DialogFooter, {
              children: [
                _jsx(Button, {
                  variant: 'outline',
                  onClick: function () {
                    return setPendingDelete(null);
                  },
                  disabled: deletingId !== null,
                  children: 'Cancel',
                }),
                _jsx(Button, {
                  variant: 'destructive',
                  onClick: confirmDelete,
                  disabled: deletingId !== null,
                  children: deletingId ? 'Deleting...' : 'Delete',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
var ClientDate = function (_a) {
  var dateString = _a.dateString;
  var _b = useState(dateString),
    formatted = _b[0],
    setFormatted = _b[1];
  useEffect(
    function () {
      setFormatted(new Date(dateString).toLocaleDateString());
    },
    [dateString],
  );
  return _jsx('span', { children: formatted });
};
export default WaitlistTable;
//# sourceMappingURL=WaitlistTable.js.map
