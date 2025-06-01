'server only';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

/**
 * Fetches and calculates user metrics such as active waitlists, total signups, and conversion rate.
 *
 * The function first authenticates the user to get their ID. It then retrieves the user's data including
 * their waitlists and subscribers from the database. If the user is not found or unauthorized, it throws an error.
 * Metrics are calculated based on the retrieved data, and a default set of metrics is returned in case of any errors.
 *
 * @returns An object containing the active waitlists count, total signups count, and conversion rate.
 * @throws Error If authentication fails or if the user is not found.
 */
export async function getUserMetrics() {
  try {
    const authResponse = await auth();
    const userId = authResponse.userId;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    // Get the user with their waitlists and subscribers
    const user = await db.user.findUnique({
      where: { externalId: userId },
      include: {
        waitlists: {
          include: {
            _count: {
              select: { subscribers: true },
            },
          },
        },
        subscribers: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate metrics
    const activeWaitlists = user.waitlists.filter(
      (waitlist) => waitlist.status === 'ACTIVE',
    ).length;

    const totalSignups = user.subscribers.length;

    // Calculate conversion rate (for simplicity, we'll use a placeholder)
    // In a real app, you'd track visits and calculate actual conversion rate
    const conversionRate =
      activeWaitlists > 0
        ? Math.min(100, Math.round((totalSignups / (activeWaitlists * 50)) * 100))
        : 0;

    return {
      activeWaitlists,
      totalSignups,
      conversionRate: Math.min(100, conversionRate), // Cap at 100%
    };
  } catch (error) {
    console.error('Error fetching user metrics:', error);
    // Return default values in case of error
    return {
      activeWaitlists: 0,
      totalSignups: 0,
      conversionRate: 0,
    };
  }
}
