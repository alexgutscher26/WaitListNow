import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';

interface WaitlistSettings {
  allowDuplicates?: boolean;
  maxSignups?: number;
  emailVerification?: boolean;
  referralEnabled?: boolean;
  referralReward?: string;
  customCss?: string;
  customJs?: string;
}

function getWaitlistSettings(settings: any): WaitlistSettings {
  if (typeof settings !== 'object' || settings === null) {
    return {};
  }
  return settings as WaitlistSettings;
}

// Validation schema for subscriber data
const subscriberSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
});

// Enable debug logging in development
const isDev = process.env.NODE_ENV === 'development';
const log = (...args: any[]) => isDev && console.log('[Waitlist Subscribers API]', ...args);

// GET /api/waitlists/[id]/subscribers - Get subscribers for a specific waitlist
// POST /api/waitlists/[id]/subscribers - Add a new subscriber to a waitlist
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the waitlist ID from the URL parameters
    const waitlistId = params.id;

    // Parse and validate the request body
    const json = await req.json();
    const body = subscriberSchema.parse(json);

    // Find the waitlist
    const waitlist = await db.waitlist.findUnique({
      where: {
        id: waitlistId,
        status: 'ACTIVE',
      },
    });

    if (!waitlist) {
      return new NextResponse('Waitlist not found or not active', { status: 404 });
    }

    // Check if email already exists for this waitlist if duplicates are not allowed
    const settings = getWaitlistSettings(waitlist.settings);
    const allowDuplicates = settings.allowDuplicates === true;

    if (!allowDuplicates) {
      const existingSubscriber = await db.subscriber.findFirst({
        where: {
          email: body.email,
          waitlistId,
        },
      });

      if (existingSubscriber) {
        return new NextResponse('Email already subscribed to this waitlist', { status: 400 });
      }
    }

    // Create the subscriber
    const subscriber = await db.subscriber.create({
      data: {
        email: body.email,
        name: body.name || null,
        waitlistId,
        userId: waitlist.userId, // Link to the waitlist owner
        status: 'PENDING',
      },
    });

    // Increment the waitlist's subscriber count
    await db.waitlist.update({
      where: { id: waitlistId },
      data: {
        subscriberCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error('[WAITLIST_SUBSCRIBER_POST]', error);

    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status'); // e.g., 'PENDING', 'VERIFIED', 'ALL'
    const search = searchParams.get('search') || '';

    // Get the waitlist ID from the URL parameters
    const waitlistId = params.id;

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Check if the waitlist exists and belongs to the user
    const waitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id,
      },
    });

    if (!waitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Build the where clause for filtering
    const whereClause: any = {
      waitlistId,
    };

    // Add status filter if provided
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    // Add search filter if provided
    if (search) {
      whereClause.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await db.subscriber.count({
      where: whereClause,
    });

    // Calculate pagination values
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    // Get paginated subscribers
    const subscribers = await db.subscriber.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        referralCode: true,
        referredBy: true,
        customFields: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Prepare response with pagination metadata
    const response = {
      data: subscribers,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[WAITLISTS_GET_SUBSCRIBERS]', error);
    log('Error details:', error);

    if (error instanceof Error) {
      log('Error stack:', error.stack);
      return new NextResponse(
        JSON.stringify({
          error: 'Internal server error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
