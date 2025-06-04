'use client';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Users, Zap, Mail, DollarSign, TrendingUp, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface ActivityItemProps {
  activity: Activity;
  iconType: string;
  message: React.ReactNode;
}

interface Activity {
  type: string;
  time: string;
  waitlistId?: string;
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

const getActivityUrl = (activity: Activity): string | null => {
  switch (activity.type) {
    case 'new_subscriber':
      return activity.waitlistId ? `/dashboard/waitlists/${activity.waitlistId}` : null;
    case 'waitlist_created':
      return activity.waitlistId ? `/dashboard/waitlists/${activity.waitlistId}` : null;
    case 'referral':
      return '/dashboard/referrals';
    case 'conversion':
      return activity.waitlistId ? `/dashboard/waitlists/${activity.waitlistId}` : null;
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

export default ActivityItem;
