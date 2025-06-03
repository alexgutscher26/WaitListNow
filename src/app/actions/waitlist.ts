'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// Type for the auth response
type AuthResponse = {
  userId: string | null;
};

/**
 * Fetches comprehensive statistics related to user waitlists.
 *
 * This function retrieves detailed data including total subscribers, new subscribers from the past week,
 * growth rate, active and completed waitlists, recent activities, and individual waitlist details.
 * It involves multiple database queries to gather all necessary information and performs calculations
 * for derived metrics like growth rate and recent activities. The function handles user authentication
 * and ensures that only authorized users can access their waitlist statistics.
 *
 * @returns An object containing various statistics and details about the user's waitlists.
 * @throws Error if the user is not authenticated or if there is an issue fetching data from the database.
 */
export async function getWaitlistStats() {
  try {
    const authResponse = (await auth()) as AuthResponse;
    const clerkUserId = authResponse.userId;

    if (!clerkUserId) {
      throw new Error('Unauthorized: You must be signed in to view waitlist stats');
    }

    // Find the internal user ID that matches the Clerk user ID
    const user = await db.user.findUnique({
      where: { externalId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return {
        totalSubscribers: 0,
        newThisWeek: 0,
        growthRate: 0,
        activeWaitlists: 0,
        completedWaitlists: 0,
        recentActivities: [],
        waitlists: [],
      };
    }

    const userId = user.id;

    // Get waitlists for the current user with subscriber counts
    const userWaitlists = await db.waitlist.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        subscribers: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            referralCode: true,
            referredBy: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
        _count: {
          select: { subscribers: true },
        },
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // If no waitlists found, return early with empty results
    if (userWaitlists.length === 0) {
      return {
        totalSubscribers: 0,
        newThisWeek: 0,
        growthRate: 0,
        activeWaitlists: 0,
        completedWaitlists: 0,
        recentActivities: [],
        waitlists: [],
      };
    }

    // Get subscriber count for all waitlists
    const subscriberStats = await db.waitlist.aggregate({
      where: { userId },
      _sum: { subscriberCount: true },
      _count: { id: true },
    });

    // Get waitlists with subscriber counts and recent subscribers
    const waitlists = await db.waitlist.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        status: true,
        slug: true,
        createdAt: true,
        subscribers: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            referralCode: true,
            referredBy: true,
            status: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10, // Limit to most recent 10 subscribers per waitlist
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get recent waitlist creation activity
    const recentWaitlists = await db.waitlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5, // Get 5 most recent waitlists
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
    });

    // Calculate stats
    const totalSubscribers = waitlists.reduce((sum, wl) => sum + wl.subscribers.length, 0);

    const newThisWeek = waitlists.reduce((sum, wl) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return sum + wl.subscribers.filter((sub) => new Date(sub.createdAt) > oneWeekAgo).length;
    }, 0);

    // Calculate growth rate based on subscriber growth over the past 4 weeks
    const now = new Date();
    const fourWeeksAgo = new Date(now);
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28); // 4 weeks ago

    // Get all subscribers from the past 4 weeks grouped by week
    const weeklySubscribers = Array(4).fill(0);

    waitlists.forEach((wl) => {
      wl.subscribers.forEach((sub) => {
        const subDate = new Date(sub.createdAt);
        if (subDate > fourWeeksAgo) {
          // Calculate which week (0-3) this subscriber belongs to
          const weekNum = Math.min(
            3,
            Math.floor((now.getTime() - subDate.getTime()) / (7 * 24 * 60 * 60 * 1000)),
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

    // Generate recent activity
    const recentActivity = [];
    const currentTime = new Date();

    // Add waitlist creation activities
    for (const wl of recentWaitlists) {
      recentActivity.push({
        id: `wl-${wl.id}`,
        type: 'waitlist_created' as const,
        name: wl.name,
        time: wl.createdAt,
        subscribers: 0, // Will be updated in the next step
        waitlistId: wl.id,
      });
    }

    // Add subscriber activities
    let subscriberCount = 0;
    for (const wl of waitlists) {
      // Update waitlist creation activity with subscriber count
      const wlActivity = recentActivity.find((a) => a.id === `wl-${wl.id}`);
      if (wlActivity) {
        wlActivity.subscribers = wl.subscribers.length;
      }

      // Add subscriber activities
      for (const sub of wl.subscribers) {
        subscriberCount++;
        if (subscriberCount > 10) break; // Limit total activities to prevent too many

        recentActivity.push({
          id: `sub-${sub.id}`,
          type: 'new_subscriber' as const,
          name: sub.name || sub.email.split('@')[0],
          email: sub.email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${sub.email}`,
          waitlist: wl.name,
          waitlistId: wl.id,
          time: sub.createdAt,
        });

        // Add referral activity if applicable
        if (sub.referralCode || sub.referredBy) {
          recentActivity.push({
            id: `ref-${sub.id}`,
            type: 'referral' as const,
            name: sub.name || sub.email.split('@')[0],
            referrer: sub.referredBy || 'someone',
            referred: sub.email,
            reward: 'Early access',
            time: new Date(sub.createdAt.getTime() + 1000), // Add 1 second to ensure proper ordering
          });
        }
      }
    }

    // Add milestone activity (every 100 subscribers)
    const milestone = Math.floor(totalSubscribers / 100) * 100;
    if (milestone > 0 && totalSubscribers % 100 < 10) {
      // Only show milestone when close to the next 100
      recentActivity.push({
        id: `mile-${milestone}`,
        type: 'milestone' as const,
        name: 'Milestone Reached',
        message: `🎉 You've reached ${milestone} total subscribers!`,
        time: new Date(currentTime.getTime() - 1000), // 1 second ago
      });
    }

    // Sort activities by time (newest first) and limit to 10
    const sortedActivities = recentActivity
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 10);

    return {
      totalSubscribers,
      newThisWeek,
      growthRate,
      activeWaitlists: waitlists.filter((wl) => wl.status === 'ACTIVE').length,
      completedWaitlists: waitlists.filter((wl) => wl.status === 'ARCHIVED').length,
      recentActivities: sortedActivities,
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
