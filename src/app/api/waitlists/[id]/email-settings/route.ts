import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const emailSettingsSchema = z.object({
  customFields: z.object({
    sendConfirmationEmail: z.boolean().optional(),
    customThankYouMessage: z.string().optional(),
  }),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the waitlist ID from the URL parameters
    const waitlistId = params.id;

    // Validate request body
    const body = await req.json();
    const validation = emailSettingsSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request data', details: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { customFields } = validation.data;

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get the current waitlist to preserve existing customFields
    const currentWaitlist = await db.waitlist.findUnique({
      where: { id: waitlistId },
    });

    if (!currentWaitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Merge existing customFields with new ones
    const updatedCustomFields = {
      ...((currentWaitlist.customFields as Record<string, unknown>) || {}),
      ...customFields,
    };

    // Update the waitlist with the merged customFields
    const updatedWaitlist = await db.waitlist.update({
      where: {
        id: waitlistId,
        userId: user.id, // Ensure the waitlist belongs to the user
      },
      data: {
        customFields: updatedCustomFields,
      },
    });

    return NextResponse.json(updatedWaitlist);
  } catch (error) {
    console.error('[WAITLIST_EMAIL_SETTINGS_UPDATE]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
