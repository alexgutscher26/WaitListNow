'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function getWaitlistStats() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Get waitlists with subscriber counts
    const waitlists = await db.waitlist.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        subscribers: {
          select: { id: true, createdAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate stats
    const totalSubscribers = waitlists.reduce(
      (sum, wl) => sum + wl.subscribers.length,
      0
    );

    const newThisWeek = waitlists.reduce((sum, wl) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return (
        sum +
        wl.subscribers.filter((sub) => new Date(sub.createdAt) > oneWeekAgo).length
      );
    }, 0);

    // Calculate growth rate based on subscriber growth over the past 4 weeks
    const now = new Date();
    const fourWeeksAgo = new Date(now);
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28); // 4 weeks ago
    
    // Get all subscribers from the past 4 weeks grouped by week
    const weeklySubscribers = Array(4).fill(0);
    
    waitlists.forEach(wl => {
      wl.subscribers.forEach(sub => {
        const subDate = new Date(sub.createdAt);
        if (subDate > fourWeeksAgo) {
          // Calculate which week (0-3) this subscriber belongs to
          const weekNum = Math.min(
            3, 
            Math.floor((now.getTime() - subDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
          );
          weeklySubscribers[3 - weekNum]++; // Reverse order (most recent week last)
        }
      });
    });
    
    // Calculate week-over-week growth rate
    let growthRate = 0;
    let validWeeks = 0;
    
    for (let i = 1; i < weeklySubscribers.length; i++) {
      const currentWeek = weeklySubscribers[i];
      const previousWeek = weeklySubscribers[i - 1];
      
      if (previousWeek > 0) {
        const weeklyGrowth = ((currentWeek - previousWeek) / previousWeek) * 100;
        growthRate += weeklyGrowth;
        validWeeks++;
      }
    }
    
    // Calculate average growth rate if we have valid data, otherwise default to 0
    growthRate = validWeeks > 0 ? growthRate / validWeeks : 0;

    return {
      totalSubscribers,
      newThisWeek,
      growthRate,
      activeWaitlists: waitlists.filter((wl) => wl.status === 'ACTIVE').length,
      completedWaitlists: waitlists.filter((wl) => wl.status === 'ARCHIVED').length, // Using ARCHIVED instead of COMPLETED
      waitlists: waitlists.map((wl) => ({
        id: wl.id,
        name: wl.name,
        subscribers: wl.subscribers.length,
        createdAt: wl.createdAt,
      })),
    };
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    throw new Error('Failed to fetch waitlist stats');
  }
}
