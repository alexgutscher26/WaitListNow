import { WaitlistStatus } from '@prisma/client';
import { WaitlistFormValues } from '@/lib/validations/waitlist';

export interface Waitlist extends Omit<WaitlistFormValues, 'style' | 'settings'> {
  id: string;
  slug: string;
  userId: string;
  status: WaitlistStatus;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    subscribers: number;
  };
  style: NonNullable<WaitlistFormValues['style']>;
  settings: NonNullable<WaitlistFormValues['settings']>;
}

export interface WaitlistWithSubscribers extends Waitlist {
  subscribers: Array<{
    id: string;
    email: string;
    name: string | null;
    status: string;
    createdAt: Date;
  }>;
}

export interface CreateWaitlistData extends Omit<WaitlistFormValues, 'style' | 'settings'> {
  style?: WaitlistFormValues['style'];
  settings?: WaitlistFormValues['settings'];
}

export interface UpdateWaitlistData extends Partial<CreateWaitlistData> {
  id: string;
}

export interface WaitlistStats {
  totalSubscribers: number;
  newThisWeek: number;
  growthRate: number;
  activeWaitlists: number;
  completedWaitlists: number;
  averageWaitTime: string;
  conversionRate: number;
  totalRevenue: number;
  monthlyGrowth: number;
}
