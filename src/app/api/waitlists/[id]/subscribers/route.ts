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
/**
 * Handles POST requests to subscribe a user to a waitlist.
 *
 * This function validates the API key, parses and validates the request body,
 * checks if the waitlist exists and is active, verifies if duplicates are allowed,
 * creates a subscriber record, and updates the waitlist's subscriber count.
 * It handles various error scenarios such as invalid API keys, missing waitlists,
 * duplicate subscriptions, and internal server errors.
 *
 * @param req - The NextRequest object containing the request details.
 * @param { params: { id: string } } - An object containing the URL parameters, including the waitlist ID.
 * @returns A NextResponse with JSON data indicating success or error information.
 * @throws Various errors based on validation failures and database operations.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const apiKey = req.headers.get('authorization')?.replace('Bearer ', '');

  // Replace this with your actual API key validation logic
  if (!apiKey || !(await isValidApiKey(apiKey, params.id))) {
    return new Response(JSON.stringify({ error: 'Unauthorized: API key required' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
    });
  }

  console.log('Received Authorization header:', req.headers.get('authorization'));

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
      return new NextResponse(JSON.stringify({ error: 'Waitlist not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
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

/**
 * Handles GET requests to retrieve subscribers from a waitlist.
 *
 * This function performs several steps:
 * 1. Verifies user authentication and retrieves the userId.
 * 2. Parses query parameters for pagination, filtering by status, and search.
 * 3. Retrieves the waitlist ID from URL parameters.
 * 4. Finds the user in the database using the userId.
 * 5. Checks if the specified waitlist exists and belongs to the user.
 * 6. Constructs a where clause based on query parameters for filtering.
 * 7. Retrieves the total count of subscribers matching the filter criteria.
 * 8. Calculates pagination values (total pages, skip, take).
 * 9. Fetches paginated subscribers from the database with specific fields selected and ordered by creation date.
 * 10. Prepares a response object containing the subscriber data and pagination metadata.
 * 11. Handles any errors that occur during execution and returns appropriate error responses.
 *
 * @param req - The NextRequest object containing the request details.
 * @param { params: { id: string } } - An object containing the waitlist ID from URL parameters.
 * @returns A NextResponse object with JSON data containing subscribers and pagination metadata, or an error response if something goes wrong.
 */
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
      return new NextResponse(JSON.stringify({ error: 'Waitlist not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
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

async function isValidApiKey(apiKey: string, waitlistId: string): Promise<boolean> {
  // Find the waitlist and its owner
  const waitlist = await db.waitlist.findUnique({
    where: { id: waitlistId },
    select: { userId: true },
  });
  if (!waitlist) return false;

  // Find the user and check the API key
  const user = await db.user.findUnique({
    where: { id: waitlist.userId },
    select: { apiKey: true },
  });
  if (!user) return false;

  // Compare the provided API key with the user's stored API key
  return user.apiKey === apiKey;
}
