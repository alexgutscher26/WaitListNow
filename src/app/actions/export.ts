'server only';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { format } from 'date-fns';

type ExportResult = {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
};

export async function exportWaitlists(): Promise<ExportResult> {
  try {
    const authResponse = await auth();
    const userId = authResponse.userId;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Get user's waitlists with subscribers
    const waitlists = await db.waitlist.findMany({
      where: {
        user: {
          externalId: userId,
        },
      },
      include: {
        subscribers: {
          select: {
            email: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            referralCode: true,
            referredBy: true,
          },
        },
      },
    });

    if (!waitlists || waitlists.length === 0) {
      throw new Error('No waitlists found');
    }

    // Convert waitlists to CSV format
    let csvContent =
      'Waitlist Name,Subscriber Email,Status,Signup Date,Last Updated,Referral Code,Referred By\n';

    waitlists.forEach((waitlist) => {
      if (waitlist.subscribers && waitlist.subscribers.length > 0) {
        waitlist.subscribers.forEach((subscriber) => {
          csvContent += `"${waitlist.name}",`;
          csvContent += `"${subscriber.email}",`;
          csvContent += `"${subscriber.status}",`;
          csvContent += `"${format(new Date(subscriber.createdAt), 'yyyy-MM-dd HH:mm:ss')}",`;
          csvContent += `"${subscriber.updatedAt ? format(new Date(subscriber.updatedAt), 'yyyy-MM-dd HH:mm:ss') : ''}",`;
          csvContent += `"${subscriber.referralCode || ''}",`;
          csvContent += `"${subscriber.referredBy || ''}"\n`;
        });
      } else {
        // Include waitlist even if it has no subscribers
        csvContent += `"${waitlist.name}",,,,,,\n`;
      }
    });

    // Create a Blob and return it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    return {
      success: true,
      url,
      filename: `waitlist-export-${format(new Date(), 'yyyy-MM-dd')}.csv`,
    };
  } catch (error) {
    console.error('Export failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to export waitlists',
    };
  }
}
