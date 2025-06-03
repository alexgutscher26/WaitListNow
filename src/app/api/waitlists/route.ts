import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { waitlistFormSchema } from '@/lib/validations/waitlist';

// Enable debug logging in development
const isDev = process.env.NODE_ENV === 'development';
const log = (...args: any[]) => isDev && console.log('[Waitlist API]', ...args);

// POST /api/waitlists - Create a new waitlist
export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse and validate request body
    const json = await req.json();
    const body = waitlistFormSchema.parse(json);

    // Check if user exists or create a new one
    let user = await db.user.findUnique({
      where: { externalId: userId },
    });

    let email: string | undefined = undefined;
    if (user) {
      email = user.email;
    } else {
      // If user doesn't exist, get email from auth provider if possible, fallback to json.email
      email = json.email;
    }

    if (!user) {
      if (!email) {
        return new NextResponse('Email is required', { status: 400 });
      }
      user = await db.user.create({
        data: {
          externalId: userId,
          email,
        },
      });
    }

    // Generate a slug from the waitlist name
    if (!body.name || typeof body.name !== 'string') {
      return new NextResponse('Waitlist name is required and must be a string', { status: 400 });
    }

    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if waitlist with this slug already exists for the user
    const existingWaitlist = await db.waitlist.findFirst({
      where: {
        slug,
        userId: user.id,
      },
    });

    if (existingWaitlist) {
      return new NextResponse('You already have a waitlist with this name', {
        status: 400,
      });
    }

    // Create the waitlist
    const waitlist = await db.waitlist.create({
      data: {
        name: body.name,
        slug,
        description: body.description || null,
        websiteUrl: body.websiteUrl || null,
        redirectUrl: body.redirectUrl || null,
        userId: user.id,
        status: 'DRAFT',
        customFields: body.customFields || [],
        style: body.style || {},
        settings: body.settings || {},
      },
    });

    return NextResponse.json(waitlist);
  } catch (error) {
    console.error('[WAITLISTS_POST]', error);
    log('Error details:', error);

    if (error instanceof Error) {
      log('Error stack:', error.stack);
      return new NextResponse(
        JSON.stringify({
          error: error.message,
          stack: isDev ? error.stack : undefined,
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
        details: isDev ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

// GET /api/waitlists - Get all waitlists for the current user
export async function GET(req: NextRequest) {
  try {
    console.log('[WAITLISTS_GET] Fetching waitlists...');

    const { userId } = getAuth(req);
    // console.log('[WAITLISTS_GET] User ID from auth:', userId);

    if (!userId) {
      // console.error('[WAITLISTS_GET] No user ID found in session');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { externalId: userId },
    });
    // console.log('[WAITLISTS_GET] Found user:', user?.id);

    if (!user) {
      console.error('[WAITLISTS_GET] User not found in database');
      return new NextResponse('User not found', { status: 404 });
    }

    // console.log('[WAITLISTS_GET] Querying waitlists for user:', user.id);
    const waitlists = await db.waitlist.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // console.log(`[WAITLISTS_GET] Found ${waitlists.length} waitlists`);
    return NextResponse.json(waitlists);
  } catch (error) {
    console.error('[WAITLISTS_GET]', error);
    log('Error details:', error);

    if (error instanceof Error) {
      log('Error stack:', error.stack);
      return new NextResponse(
        JSON.stringify({
          error: error.message,
          stack: isDev ? error.stack : undefined,
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
        details: isDev ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
