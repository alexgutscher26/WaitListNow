'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

type SubscriberGrowthData = Array<{
  date: string;
  count: number;
  cumulative: number;
}>;

export async function getSubscriberGrowth(waitlistId: string, days = 30) {
  try {
    const session = await auth();
    const userId = session.userId;
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Verify the waitlist belongs to the user
    const waitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        user: {
          externalId: userId,
        },
      },
    });

    if (!waitlist) {
      throw new Error('Waitlist not found');
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily subscriber counts
    const dailyCounts = await db.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT 
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(*)::bigint as count
      FROM "Subscriber"
      WHERE 
        "waitlistId" = ${waitlistId}
        AND "createdAt" >= ${startDate}
        AND "createdAt" <= ${endDate}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date ASC
    `;

    // Format the data for the chart
    const result: SubscriberGrowthData = [];

    // Generate all dates in the range to ensure we have entries for all days
    const dateMap = new Map<string, number>();
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateMap.set(dateStr, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fill in the actual counts
    dailyCounts.forEach((item) => {
      const dateStr = new Date(item.date).toISOString().split('T')[0];
      dateMap.set(dateStr, Number(item.count));
    });

    // Convert to array and calculate cumulative
    let runningTotal = await db.subscriber.count({
      where: {
        waitlistId,
        createdAt: { lt: startDate },
      },
    });

    Array.from(dateMap.entries()).forEach(([date, count]) => {
      runningTotal += count;
      result.push({
        date,
        count,
        cumulative: runningTotal,
      });
    });

    return result;
  } catch (error) {
    console.error('Error fetching subscriber growth data:', error);
    throw new Error('Failed to fetch subscriber growth data');
  }
}
