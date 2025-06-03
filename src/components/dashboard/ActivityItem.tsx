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

/**
 * Determines the icon associated with a given activity type.
 *
 * This function uses a switch statement to map each activity type string to its corresponding icon component.
 * If the provided type does not match any known cases, it defaults to returning the Bell icon.
 *
 * @param type - The string representing the type of activity.
 * @returns The icon component associated with the given activity type.
 */
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
 * Determines the URL associated with a given activity type.
 *
 * This function uses a switch statement to map different activity types to their respective URLs.
 * It checks for specific conditions, such as the presence of a waitlistId, to determine the exact URL path.
 *
 * @param activity - An object representing the activity with a 'type' property and optional 'waitlistId'.
 * @returns The URL string associated with the activity type, or null if no matching URL is found.
 */
const getActivityUrl = (activity: any): string | null => {
  switch (activity.type) {
    case 'new_subscriber':
      return activity.waitlistId
        ? `/dashboard/waitlists/${activity.waitlistId}/subscribers`
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

/**
 * Renders an activity item with an icon, message, and view details option.
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ activity, iconType, message }) => {
  const { toast } = useToast();
  const router = useRouter();
  const Icon = getActivityIcon(iconType);

  /**
   * Handles viewing activity details by redirecting or showing a toast if unavailable.
   */
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

/**
 * Generates a summary string based on different types of user activities.
 *
 * This function processes an activity object and returns a formatted summary string based on its type.
 * The supported types include 'new_subscriber', 'waitlist_created', 'referral', 'conversion',
 * 'milestone', and a default for any other types.
 *
 * @param activity - An activity object containing details about the user action.
 * @returns A formatted summary string describing the activity.
 */
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