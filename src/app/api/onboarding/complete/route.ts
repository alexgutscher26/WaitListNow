import { NextResponse, type NextRequest } from 'next/server';
import { getAuth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { onboardingCompleteSchema } from '@/lib/validations/onboarding';
import { z } from 'zod';

// Enable debug logging in development
const isDev = process.env.NODE_ENV === 'development';
const log = (...args: any[]) => isDev && console.log('[Onboarding API]', ...args);

// POST /api/onboarding/complete - Mark onboarding as complete
export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse and validate request body
    const json = await req.json();
    const data = onboardingCompleteSchema.parse(json);

    log('Onboarding data received:', data);

    // Get the current user from Clerk to get their email
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      return new NextResponse(
        JSON.stringify({ error: 'Email address not found' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find or create the user in the database
    let user = await db.user.findUnique({
      where: { externalId: userId },
    });

    // If user doesn't exist, create them
    if (!user) {
      log('User not found, creating new user with externalId:', userId);
      try {
        user = await db.user.create({
          data: {
            externalId: userId,
            email: userEmail,
            // Add any other required fields with default values
          },
        });
        log('Created new user:', user.id);
      } catch (createError) {
        console.error('Error creating user:', createError);
        return new NextResponse(
          JSON.stringify({ error: 'Failed to create user' }), 
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      log('Found existing user:', user.id);
    }

    // Prepare the update data with the correct field names from Prisma schema
    const updateData = {
      onboardingComplete: true,
      onboardingCompletedAt: new Date()
    };

    // Alternative: Store in separate onboarding fields if you have them
    // Uncomment and modify based on your actual schema:
    /*
    updateData = {
      onboardingComplete: true,
      onboardingCompletedAt: new Date(),
      // Add other specific fields based on your onboarding data structure
      // companyName: data.companyName,
      // role: data.role,
      // etc.
    };
    */

    log('Update data:', updateData);

    // Update the user to mark onboarding as complete
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        plan: true,
        createdAt: true,
        updatedAt: true,
      } as const, // Use const assertion to help with type inference
    });

    log('User updated successfully:', updatedUser.id);

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('[ONBOARDING_COMPLETE]', error);
    log('Error details:', error);
    
    // Handle Prisma errors specifically
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      if (prismaError.code === 'P2002') {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Unique constraint violation',
            details: isDev ? prismaError.message : undefined
          }),
          { 
            status: 409, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
      if (prismaError.code === 'P2025') {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Record not found',
            details: isDev ? prismaError.message : undefined
          }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    }
    
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Validation error',
          details: error.errors 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ 
          error: error.message,
          stack: isDev ? error.stack : undefined 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        details: isDev ? String(error) : undefined 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}