'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import ActivityItem from './ActivityItem';

interface RecentActivityModalProps {
  recentActivity: any[];
}

/**
 * Formats an activity message based on the type of activity provided.
 *
 * The function uses a switch statement to determine the type of activity and returns a JSX element with formatted content accordingly.
 *
 * @param activity - An object containing details about the activity.
 * @returns A JSX element representing the formatted activity message.
 */
function formatActivityMessage(activity: any) {
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

/**
 * Modal component to display recent activity items.
 */
const RecentActivityModal: React.FC<RecentActivityModalProps> = ({ recentActivity }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-brand-600 hover:text-brand-700"
        onClick={() => setOpen(true)}
      >
        View all
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>All Recent Activity</DialogTitle>
            <DialogDescription>Full list of your recent actions across all waitlists.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecentActivityModal; 