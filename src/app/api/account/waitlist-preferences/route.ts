import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { 
  getUserWaitlistPreferences,
  updateUserWaitlistPreferences,
  type WaitlistPreferences
} from '@/lib/waitlist-preferences';

// GET handler to fetch waitlist preferences
/**
 * Handles GET requests to fetch waitlist preferences for an authenticated user.
 *
 * It first authenticates the user, retrieves the user ID from the session,
 * and checks if the user is authorized. If authorized, it fetches the user's waitlist preferences
 * and returns them in a JSON response. If any step fails, it logs the error and returns an appropriate error response.
 *
 * @returns A JSON response containing either the user's waitlist preferences or an error message.
 */
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
        { status: 401 }
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
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT handler to update waitlist preferences
/**
 * Handles PUT requests to update waitlist preferences for a user.
 *
 * This function authenticates the user, parses and validates the request body,
 * updates the user's waitlist preferences in the database, and returns the updated preferences.
 * It handles errors related to authentication, parsing, validation, and database operations.
 *
 * @param request - The incoming HTTP request object.
 * @returns A JSON response containing either the updated preferences or an error message.
 */
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
        { status: 401 }
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
          details: parseError instanceof Error ? parseError.message : 'Failed to parse JSON'
        },
        { status: 400 }
      );
    }
    
    // Validate input
    const validationErrors: string[] = [];
    
    if (updates.autoApproveSubscribers !== undefined && typeof updates.autoApproveSubscribers !== 'boolean') {
      validationErrors.push('autoApproveSubscribers must be a boolean');
    }
    if (updates.emailNotifications !== undefined && typeof updates.emailNotifications !== 'boolean') {
      validationErrors.push('emailNotifications must be a boolean');
    }
    if (updates.requireEmailVerification !== undefined && typeof updates.requireEmailVerification !== 'boolean') {
      validationErrors.push('requireEmailVerification must be a boolean');
    }
    if (updates.maxSubscribers !== undefined && (typeof updates.maxSubscribers !== 'number' || updates.maxSubscribers < 100 || updates.maxSubscribers > 10000)) {
      validationErrors.push('maxSubscribers must be a number between 100 and 10000');
    }
    if (updates.defaultWaitlistLimit !== undefined && (typeof updates.defaultWaitlistLimit !== 'number' || updates.defaultWaitlistLimit < 1)) {
      validationErrors.push('defaultWaitlistLimit must be a number greater than 0');
    }
    
    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: validationErrors
        },
        { status: 400 }
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
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
