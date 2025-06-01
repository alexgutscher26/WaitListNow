import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  getUserWaitlistPreferences,
  updateUserWaitlistPreferences,
  type WaitlistPreferences,
} from '@/lib/waitlist-preferences';

// GET handler to fetch waitlist preferences
export async function GET() {
  try {
    console.log('GET /api/account/waitlist-preferences called');

    const authUser = await auth();
    const userId = authUser.userId;

    console.log('Authenticated user ID:', userId);

    if (!userId) {
      console.error('No user ID found in session');
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No user session found' },
        { status: 401 },
      );
    }

    console.log('Fetching waitlist preferences for user:', userId);
    const preferences = await getUserWaitlistPreferences(userId);
    console.log('Retrieved preferences:', preferences);

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error in GET /api/account/waitlist-preferences:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}

// PUT handler to update waitlist preferences
export async function PUT(request: Request) {
  try {
    console.log('PUT /api/account/waitlist-preferences called');

    const authUser = await auth();
    const userId = authUser.userId;

    console.log('Authenticated user ID:', userId);

    if (!userId) {
      console.error('No user ID found in session');
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No user session found' },
        { status: 401 },
      );
    }

    let updates: Partial<WaitlistPreferences>;
    try {
      const body = await request.text();
      console.log('Request body:', body);
      updates = JSON.parse(body);
      console.log('Parsed updates:', updates);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: parseError instanceof Error ? parseError.message : 'Failed to parse JSON',
        },
        { status: 400 },
      );
    }

    // Validate input
    const validationErrors: string[] = [];

    if (
      updates.autoApproveSubscribers !== undefined &&
      typeof updates.autoApproveSubscribers !== 'boolean'
    ) {
      validationErrors.push('autoApproveSubscribers must be a boolean');
    }
    if (
      updates.emailNotifications !== undefined &&
      typeof updates.emailNotifications !== 'boolean'
    ) {
      validationErrors.push('emailNotifications must be a boolean');
    }
    if (
      updates.requireEmailVerification !== undefined &&
      typeof updates.requireEmailVerification !== 'boolean'
    ) {
      validationErrors.push('requireEmailVerification must be a boolean');
    }
    if (
      updates.maxSubscribers !== undefined &&
      (typeof updates.maxSubscribers !== 'number' ||
        updates.maxSubscribers < 100 ||
        updates.maxSubscribers > 10000)
    ) {
      validationErrors.push('maxSubscribers must be a number between 100 and 10000');
    }
    if (
      updates.defaultWaitlistLimit !== undefined &&
      (typeof updates.defaultWaitlistLimit !== 'number' || updates.defaultWaitlistLimit < 1)
    ) {
      validationErrors.push('defaultWaitlistLimit must be a number greater than 0');
    }

    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return NextResponse.json(
        {
          error: 'Invalid input data',
          details: validationErrors,
        },
        { status: 400 },
      );
    }

    console.log('Updating preferences for user:', userId, 'with:', updates);
    const updatedPrefs = await updateUserWaitlistPreferences(userId, updates);
    console.log('Successfully updated preferences:', updatedPrefs);

    return NextResponse.json(updatedPrefs);
  } catch (error) {
    console.error('Error in PUT /api/account/waitlist-preferences:', error);
    return NextResponse.json(
      {
        error: 'Failed to update waitlist preferences',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}
