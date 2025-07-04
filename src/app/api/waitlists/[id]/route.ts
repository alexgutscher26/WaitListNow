import { getAuth } from '@clerk/nextjs/server';
import type { Waitlist } from '@prisma/client';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { waitlistFormSchema } from '@/lib/validations/waitlist';

// Enable debug logging in development
const isDev = process.env.NODE_ENV === 'development';
const log = (...args: unknown[]) => isDev && console.log('[Waitlist API]', ...args);

// GET /api/waitlists/[id] - Get a specific waitlist
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the waitlist ID from the URL parameters
    const waitlistId = params.id;

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Find the waitlist, ensuring it belongs to the authenticated user
    const waitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id, // Ensure the waitlist belongs to the authenticated user
      },
      include: {
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
    });

    if (!waitlist) {
      return new NextResponse(JSON.stringify({ error: 'Waitlist not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(waitlist);
  } catch (error) {
    console.error('[WAITLISTS_GET_ONE]', error);
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

// PATCH /api/waitlists/[id] - Partially update a waitlist
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return handleUpdateWaitlist(req, params.id, false);
}

// PUT /api/waitlists/[id] - Replace a waitlist (full update)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return handleUpdateWaitlist(req, params.id, true);
}

// DELETE /api/waitlists/[id] - Delete a waitlist
/**
 * Handles the deletion of a waitlist and its associated subscribers.
 *
 * It verifies user authentication, checks if the waitlist exists and belongs to the user,
 * then deletes all related subscribers followed by deleting the waitlist itself within a transaction
 * to ensure data consistency. If any error occurs during these processes, it logs the error and returns
 * an appropriate HTTP response with a 500 status code.
 *
 * @param req - The Next.js request object containing user information and headers.
 * @param {params: { id: string }} - An object containing the waitlist ID from the URL parameters.
 * @returns A `NextResponse` with a 204 No Content status on successful deletion, or an error response if applicable.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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
    const existingWaitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id,
      },
    });

    if (!existingWaitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Use a transaction to ensure data consistency
    await db.$transaction([
      // First delete all related subscribers
      db.subscriber.deleteMany({
        where: { waitlistId },
      }),
      // Then delete the waitlist
      db.waitlist.delete({
        where: { id: waitlistId },
      }),
    ]);

    // Return 204 No Content on successful deletion
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[WAITLISTS_DELETE]', error);

    // Log the error details, including the stack trace, for debugging purposes
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
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

// Shared handler for both PUT and PATCH
/**
 * Handles updating a waitlist based on the request and update type.
 *
 * This function performs several key steps: verifying authentication, checking if the user exists,
 * ensuring the waitlist belongs to the user, parsing and validating the request body, handling partial or full updates,
 * validating provided fields, generating a new slug if the name changes, checking for slug conflicts, updating the
 * waitlist in the database, and returning the updated waitlist. It also includes comprehensive error handling for various scenarios.
 *
 * @param req - The NextRequest object containing the request details.
 * @param waitlistId - The ID of the waitlist to be updated.
 * @param isFullUpdate - A boolean indicating whether it's a full (PUT) or partial (PATCH) update.
 * @returns A JSON response containing the updated waitlist or an error message.
 */
async function handleUpdateWaitlist(req: NextRequest, waitlistId: string, isFullUpdate: boolean) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Check if the waitlist exists and belongs to the user
    const existingWaitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id,
      },
    });

    if (!existingWaitlist) {
      return new NextResponse(JSON.stringify({ error: 'Waitlist not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse and validate request body
    const json = await req.json();

    // For PATCH, merge with existing data; for PUT, use the provided data directly
    const updateData = isFullUpdate ? json : { ...json }; // Don't spread existingWaitlist to avoid including internal fields

    // For PATCH requests, we'll only validate and update the provided fields
    const updatedData: Partial<Waitlist> = {};

    // Only validate and include fields that were actually provided in the request
    if (updateData.status !== undefined) {
      updatedData.status = updateData.status;
    }

    // If this is a full update (PUT), validate all required fields
    if (isFullUpdate) {
      const body = waitlistFormSchema.parse(updateData);
      Object.assign(updatedData, body);
    } else if (updateData.name !== undefined) {
      updatedData.name = updateData.name;
    }

    // Handle slug update if name is being changed
    if (updatedData.name && updatedData.name !== existingWaitlist.name) {
      const slug = updatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if the new slug is already in use by another waitlist of the same user
      const slugInUse = await db.waitlist.findFirst({
        where: {
          slug,
          userId: user.id,
          id: { not: waitlistId },
        },
      });

      if (slugInUse) {
        return new NextResponse('You already have a waitlist with this name', {
          status: 400,
        });
      }

      updatedData.slug = slug;
    }

    // Update the waitlist
    const updatedWaitlist = await db.waitlist.update({
      where: { id: waitlistId },
      data: updateData,
      include: {
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
    });

    return NextResponse.json(updatedWaitlist);
  } catch (error) {
    console.error('[WAITLISTS_UPDATE]', error);

    // Log the full error in development
    if (isDev) {
      console.error('Full error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error,
      });
    }

    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({
          error: 'Validation error',
          details: error.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          error: error.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Log the error details on the server
    console.error('[WAITLISTS_UPDATE] Internal server error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });

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
