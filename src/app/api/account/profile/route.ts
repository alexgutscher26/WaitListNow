import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// GET handler to fetch user profile
/**
 * Handles a GET request to fetch user profile information.
 *
 * The function first authenticates the user and retrieves their userId. If the userId is missing, it returns an unauthorized error response.
 * It then queries the database for the user details based on the externalId (userId). If the user is not found, it returns a not found error response.
 * On success, it returns the user profile information as JSON.
 *
 * @returns A NextResponse object containing either the user profile data or an error message with the corresponding HTTP status code.
 */
export async function GET() {
  try {
    const authUser = await auth();
    const userId = authUser.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { externalId: userId },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        website: true,
        bio: true,
        timezone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT handler to update user profile
/**
 * Updates a user's profile information based on the provided request data.
 *
 * The function first authenticates the user and retrieves their userId. If the userId is missing,
 * it returns an unauthorized response. It then parses the JSON data from the request, validates
 * that the 'name' field is present and not just whitespace, and updates the user's profile in the database.
 * Finally, it returns the updated user information or an error response if any step fails.
 *
 * @param request - The HTTP request object containing user update data.
 * @returns A JSON response with the updated user information or an error message.
 */
export async function PUT(request: Request) {
  try {
    const authUser = await auth();
    const userId = authUser.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { externalId: userId },
      data: {
        name: data.name,
        company: data.company || null,
        website: data.website || null,
        bio: data.bio || null,
        timezone: data.timezone || 'UTC',
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        website: true,
        bio: true,
        timezone: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
