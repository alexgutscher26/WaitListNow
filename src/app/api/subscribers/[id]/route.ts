import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const updateSubscriberSchema = z.object({
  status: z.enum(['PENDING', 'VERIFIED', 'APPROVED', 'REJECTED']).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = updateSubscriberSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request body', details: validation.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { status } = validation.data;

    // Find the subscriber
    const subscriber = await db.subscriber.findUnique({
      where: { id: params.id },
      include: {
        waitlist: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!subscriber) {
      return new NextResponse('Subscriber not found', { status: 404 });
    }

    // Verify the user owns the waitlist
    if (subscriber.waitlist.user.externalId !== userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Update the subscriber
    const updatedSubscriber = await db.subscriber.update({
      where: { id: params.id },
      data: {
        status,
      },
    });

    return new NextResponse(JSON.stringify(updatedSubscriber), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[SUBSCRIBER_UPDATE]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the subscriber
    const subscriber = await db.subscriber.findUnique({
      where: { id: params.id },
      include: {
        waitlist: true,
      },
    });

    if (!subscriber) {
      return new NextResponse('Subscriber not found', { status: 404 });
    }

    // Verify the user owns the waitlist
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user || subscriber.waitlist.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Delete the subscriber
    await db.subscriber.delete({
      where: { id: params.id },
    });

    // Update the waitlist subscriber count
    await db.waitlist.update({
      where: { id: subscriber.waitlistId },
      data: {
        subscriberCount: {
          decrement: 1,
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[SUBSCRIBER_DELETE]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
