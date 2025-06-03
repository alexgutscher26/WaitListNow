import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

/**
 * Handles GET requests to fetch user metrics.
 *
 * This function retrieves user data, including their waitlists and subscribers,
 * calculates various metrics such as active waitlists, total signups, and a placeholder conversion rate,
 * and returns these metrics in a JSON response. If the user is not found or unauthorized, it returns an appropriate error.
 *
 * @returns A JSON response containing user metrics or an error message.
 */
export async function GET() {
  try {
    const authResponse = await auth();
    const userId = authResponse.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

    return NextResponse.json({
      activeWaitlists,
      totalSignups,
      conversionRate,
      plan: user.plan, // Include the user's plan in the response
    });
  } catch (error) {
    console.error('Error fetching user metrics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
