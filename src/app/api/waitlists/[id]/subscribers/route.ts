import { NextResponse, type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { Resend } from 'resend';
import { getConfirmationEmail } from '@/emails';
import crypto from 'crypto';

interface WaitlistSettings {
  allowDuplicates?: boolean;
  maxSignups?: number;
  emailVerification?: boolean;
  referralEnabled?: boolean;
  referralReward?: string;
  customCss?: string;
  customJs?: string;
}

function getWaitlistSettings(settings: unknown): WaitlistSettings {
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
const log = (...args: unknown[]) => isDev && console.log('[Waitlist Subscribers API]', ...args);

// GET /api/waitlists/[id]/subscribers - Get subscribers for a specific waitlist
// POST /api/waitlists/[id]/subscribers - Add a new subscriber to a waitlist
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // const apiKey = req.headers.get('authorization')?.replace('Bearer ', '');
  // if (!apiKey || !(await isValidApiKey(apiKey, params.id))) {
  //   return new Response(JSON.stringify({ error: 'Unauthorized: API key required' }), {
  //     status: 401,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
  //     },
  //   });
  // }

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
      return new NextResponse(
        JSON.stringify({ error: 'Waitlist not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if email already exists for this waitlist if duplicates are not allowed
    const settings = getWaitlistSettings(waitlist.settings);
    const allowDuplicates = settings.allowDuplicates === true;
    const requireEmailVerification = settings.emailVerification === true;

    // Debug logs
    console.log('Waitlist settings:', settings);
    console.log('requireEmailVerification:', requireEmailVerification);

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

    // Generate verification token if needed
    let verificationToken: string | undefined = undefined;
    if (requireEmailVerification) {
      verificationToken = crypto.randomBytes(32).toString('hex');
    }

    // Create the subscriber
    const subscriber = await db.subscriber.create({
      data: {
        email: body.email,
        name: body.name || null,
        waitlistId,
        userId: waitlist.userId, // Link to the waitlist owner
        status: requireEmailVerification ? 'PENDING' : 'VERIFIED',
        customFields: requireEmailVerification ? { verificationToken } : {},
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

    if (requireEmailVerification) {
      // Send verification email via /api/verify-email
      try {
        console.log('Sending verification email with:', {
          email: subscriber.email,
          verificationToken,
        });
        const verifyRes = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/verify-email`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: subscriber.email,
              verificationToken,
            }),
          },
        );
        if (!verifyRes.ok) {
          const errText = await verifyRes.text();
          console.error('[WAITLIST_VERIFICATION_EMAIL_ERROR]', verifyRes.status, errText);
        } else {
          console.log('[WAITLIST_VERIFICATION_EMAIL_SENT]', subscriber.email);
        }
      } catch (emailError) {
        console.error('[WAITLIST_VERIFICATION_EMAIL_ERROR]', emailError);
        // Do not block the response if email sending fails
      }
    } else {
      // Send confirmation email if enabled
      try {
        const customFields = (waitlist.customFields ?? {}) as {
          sendConfirmationEmail?: boolean;
          customThankYouMessage?: string;
        };
        const sendConfirmation =
          typeof customFields.sendConfirmationEmail === 'boolean'
            ? customFields.sendConfirmationEmail
            : true;
        if (sendConfirmation) {
          const { html, text } = getConfirmationEmail({
            name: subscriber.name || undefined,
            waitlistName: waitlist.name,
            message: customFields.customThankYouMessage,
          });
          const resend = new Resend(process.env.RESEND_API_KEY);
          const result = await resend.emails.send({
            from: 'WaitListNow <onboarding@resend.dev>',
            to: subscriber.email,
            subject: `You're on the waitlist for ${waitlist.name}!`,
            html,
            text,
          });
          console.log('Resend API response:', result);
        }
      } catch (emailError) {
        console.error('[WAITLIST_CONFIRMATION_EMAIL_ERROR]', emailError);
        // Do not block the response if email sending fails
      }
    }

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
      return new NextResponse(
        JSON.stringify({ error: 'Waitlist not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build the where clause for filtering
    const whereClause: Record<string, unknown> = {
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
    select: { userId: true }
  });
  if (!waitlist) return false;

  // Find the user and check the API key
  const user = await db.user.findUnique({
    where: { id: waitlist.userId },
    select: { apiKey: true }
  });
  if (!user) return false;

  // Compare the provided API key with the user's stored API key
  return user.apiKey === apiKey;
}

