import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the user
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Parse request body
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return new NextResponse('No subscriber IDs provided', { status: 400 });
    }

    // Get subscribers with their waitlist info
    const subscribers = await db.subscriber.findMany({
      where: {
        id: { in: ids },
        waitlist: {
          userId: user.id,
        },
      },
      include: {
        waitlist: true,
      },
    });

    if (subscribers.length === 0) {
      return new NextResponse('No valid subscribers found', { status: 404 });
    }

    // Group subscribers by waitlist ID for batch updates
    const waitlistUpdates = subscribers.reduce(
      (acc, subscriber) => {
        if (!acc[subscriber.waitlistId]) {
          acc[subscriber.waitlistId] = 0;
        }
        acc[subscriber.waitlistId]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Delete subscribers in a transaction
    await db.$transaction([
      // Delete the subscribers
      db.subscriber.deleteMany({
        where: {
          id: { in: subscribers.map((s) => s.id) },
        },
      }),
      // Update waitlist counts
      ...Object.entries(waitlistUpdates).map(([waitlistId, count]) =>
        db.waitlist.update({
          where: { id: waitlistId },
          data: {
            subscriberCount: {
              decrement: count,
            },
          },
        }),
      ),
    ]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        deletedCount: subscribers.length,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[SUBSCRIBERS_BULK_DELETE]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
