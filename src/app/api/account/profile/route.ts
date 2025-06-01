import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// GET handler to fetch user profile
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
