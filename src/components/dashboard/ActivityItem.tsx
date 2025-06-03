'use client';
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, Zap, Mail, DollarSign, TrendingUp, Bell } from 'lucide-react';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface ActivityItemProps {
  activity: any;
  iconType: string;
  message: React.ReactNode;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'new_subscriber':
      return Users;
    case 'waitlist_created':
      return Zap;
    case 'referral':
      return Mail;
    case 'conversion':
      return DollarSign;
    case 'milestone':
      return TrendingUp;
    default:
      return Bell;
  }
};

/**
 * Determines the URL based on the type of activity.
 *
 * This function evaluates the activity type and returns a corresponding URL string.
 * If the activity type is 'new_subscriber', 'waitlist_created', or 'conversion',
 * it constructs a URL using the waitlistId if available. For 'referral' activities,
 * it returns a fixed URL. Other types like 'milestone' return null.
 *
 * @param activity - An object representing the activity with a type and optionally a waitlistId.
 * @returns The constructed URL as a string or null if no URL is applicable for the activity type.
 */
const getActivityUrl = (activity: any): string | null => {
  switch (activity.type) {
    case 'new_subscriber':
      return activity.waitlistId
        ? `/dashboard/waitlists/${activity.waitlistId}`
        : null;
    case 'waitlist_created':
      return activity.waitlistId
        ? `/dashboard/waitlists/${activity.waitlistId}`
        : null;
    case 'referral':
      return '/dashboard/referrals';
    case 'conversion':
      return activity.waitlistId
        ? `/dashboard/waitlists/${activity.waitlistId}`
        : null;
    case 'milestone':
      return null;
    default:
      return null;
  }
};

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, iconType, message }) => {
  const { toast } = useToast();
  const router = useRouter();
  const Icon = getActivityIcon(iconType);

  const handleViewDetails = () => {
    const url = getActivityUrl(activity);
    if (url) {
      router.push(url);
    } else {
      toast({
        title: 'No Details Available',
        description: 'There is no details page for this activity.',
        variant: 'default',
      });
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
      <div className="mt-1">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        {message}
        <div className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

function getActivitySummary(activity: any): string {
  switch (activity.type) {
    case 'new_subscriber':
      return `${activity.name} (${activity.email}) joined ${activity.waitlist}`;
    case 'waitlist_created':
      return `Waitlist "${activity.name}" created with ${activity.subscribers} subscribers.`;
    case 'referral':
      return `${activity.referrer} referred ${activity.referred}. Reward: ${activity.reward}`;
    case 'conversion':
      return `${activity.name} converted from ${activity.waitlist}. Revenue: $${activity.revenue}`;
    case 'milestone':
      return activity.message;
    default:
      return 'Unknown activity type.';
  }
}

export default ActivityItem; 