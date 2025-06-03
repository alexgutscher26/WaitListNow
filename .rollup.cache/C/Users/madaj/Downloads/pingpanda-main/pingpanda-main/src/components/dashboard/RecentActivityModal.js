'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import ActivityItem from './ActivityItem';
function formatActivityMessage(activity) {
  switch (activity.type) {
    case 'new_subscriber':
      return _jsxs('div', {
        children: [
          _jsxs('p', {
            className: 'text-sm font-medium',
            children: [
              _jsx('span', { className: 'font-semibold', children: activity.name }),
              ' joined',
              ' ',
              _jsx('span', { className: 'text-primary', children: activity.waitlist }),
            ],
          }),
          _jsx('p', { className: 'text-xs text-muted-foreground', children: activity.email }),
        ],
      });
    case 'waitlist_created':
      return _jsxs('div', {
        children: [
          _jsx('p', { className: 'text-sm font-medium', children: 'New waitlist created' }),
          _jsx('p', { className: 'text-xs text-muted-foreground', children: activity.name }),
        ],
      });
    case 'referral':
      return _jsxs('div', {
        children: [
          _jsxs('p', {
            className: 'text-sm font-medium',
            children: [
              _jsx('span', { className: 'font-semibold', children: activity.referrer }),
              ' referred someone',
            ],
          }),
          _jsxs('p', {
            className: 'text-xs text-muted-foreground',
            children: [activity.referred, ' \u2022 Reward: ', activity.reward],
          }),
        ],
      });
    case 'conversion':
      return _jsxs('div', {
        children: [
          _jsxs('p', {
            className: 'text-sm font-medium',
            children: [
              _jsx('span', { className: 'font-semibold', children: activity.name }),
              ' converted from',
              ' ',
              _jsx('span', { className: 'text-primary', children: activity.waitlist }),
            ],
          }),
          _jsxs('p', {
            className: 'text-xs text-muted-foreground',
            children: ['Revenue: ', activity.revenue],
          }),
        ],
      });
    case 'milestone':
      return _jsx('div', {
        children: _jsx('p', { className: 'text-sm font-medium', children: activity.message }),
      });
    default:
      return _jsx('p', { className: 'text-sm', children: 'Unknown activity' });
  }
}
var RecentActivityModal = function (_a) {
  var recentActivity = _a.recentActivity;
  var _b = useState(false),
    open = _b[0],
    setOpen = _b[1];
  return _jsxs(_Fragment, {
    children: [
      _jsxs(Button, {
        variant: 'ghost',
        size: 'sm',
        className: 'text-sm text-brand-600 hover:text-brand-700',
        onClick: function () {
          return setOpen(true);
        },
        children: ['View all', _jsx(ChevronRight, { className: 'ml-1 h-4 w-4' })],
      }),
      _jsx(Dialog, {
        open: open,
        onOpenChange: setOpen,
        children: _jsxs(DialogContent, {
          className: 'max-w-2xl w-full',
          children: [
            _jsxs(DialogHeader, {
              children: [
                _jsx(DialogTitle, { children: 'All Recent Activity' }),
                _jsx(DialogDescription, {
                  children: 'Full list of your recent actions across all waitlists.',
                }),
              ],
            }),
            _jsx('div', {
              className: 'max-h-[60vh] overflow-y-auto divide-y divide-gray-100',
              children:
                recentActivity && recentActivity.length > 0
                  ? recentActivity.map(function (activity) {
                      return _jsx(
                        ActivityItem,
                        {
                          activity: activity,
                          iconType: activity.type,
                          message: formatActivityMessage(activity),
                        },
                        activity.id,
                      );
                    })
                  : _jsx('div', {
                      className: 'p-6 text-center text-sm text-gray-500',
                      children: 'No recent activities found',
                    }),
            }),
            _jsx(DialogFooter, {
              children: _jsx(Button, {
                variant: 'outline',
                onClick: function () {
                  return setOpen(false);
                },
                children: 'Close',
              }),
            }),
          ],
        }),
      }),
    ],
  });
};
export default RecentActivityModal;
//# sourceMappingURL=RecentActivityModal.js.map
