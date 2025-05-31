import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// Define the type for notification preferences
type NotificationPreferences = {
  email: boolean;
  waitlistMilestones: boolean;
  dailyReports: boolean;
  weeklyDigest: boolean;
  signupAlerts: boolean;
  integrationUpdates: boolean;
  securityAlerts: boolean;
  marketing: boolean;
};

// Default notification preferences
const defaultPreferences: NotificationPreferences = {
  email: true,
  waitlistMilestones: true,
  dailyReports: true,
  weeklyDigest: true,
  signupAlerts: false,
  integrationUpdates: true,
  securityAlerts: true,
  marketing: false,
};

// Helper function to parse notification preferences
function parseNotificationPreferences(prefs: any): NotificationPreferences {
  if (!prefs || typeof prefs !== 'object') {
    return { ...defaultPreferences };
  }
  
  return {
    email: typeof prefs.email === 'boolean' ? prefs.email : defaultPreferences.email,
    waitlistMilestones: typeof prefs.waitlistMilestones === 'boolean' ? prefs.waitlistMilestones : defaultPreferences.waitlistMilestones,
    dailyReports: typeof prefs.dailyReports === 'boolean' ? prefs.dailyReports : defaultPreferences.dailyReports,
    weeklyDigest: typeof prefs.weeklyDigest === 'boolean' ? prefs.weeklyDigest : defaultPreferences.weeklyDigest,
    signupAlerts: typeof prefs.signupAlerts === 'boolean' ? prefs.signupAlerts : defaultPreferences.signupAlerts,
    integrationUpdates: typeof prefs.integrationUpdates === 'boolean' ? prefs.integrationUpdates : defaultPreferences.integrationUpdates,
    securityAlerts: typeof prefs.securityAlerts === 'boolean' ? prefs.securityAlerts : defaultPreferences.securityAlerts,
    marketing: typeof prefs.marketing === 'boolean' ? prefs.marketing : defaultPreferences.marketing,
  };
}

export async function GET() {
  try {
    const authResult = await auth();
    if (!authResult.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = authResult.userId;

    // Try to find user by ID or externalId
    const user = await db.user.findFirst({
      where: {
        OR: [
          { id: userId },
          { externalId: userId }
        ]
      },
      select: { 
        notificationPreferences: true 
      }
    });

    // If user not found, return default preferences
    if (!user) {
      return NextResponse.json(defaultPreferences);
    }

    // Parse and return the user's notification preferences
    const preferences = parseNotificationPreferences(user.notificationPreferences);
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authResult = await auth();
    if (!authResult.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = authResult.userId;

    const preferences = await request.json();
    
    try {
      // Parse and validate the incoming preferences
      const validPreferences = parseNotificationPreferences(preferences);
      
      // First, check if user exists by ID or externalId
      let user = await db.user.findFirst({
        where: {
          OR: [
            { id: userId },
            { externalId: userId }
          ]
        },
      });

      if (!user) {
        // Check if a user with this externalId already exists
        const existingUser = await db.user.findFirst({
          where: { externalId: userId },
        });

        if (existingUser) {
          // Update the existing user's ID to match the auth user ID
          await db.user.update({
            where: { id: existingUser.id },
            data: { id: userId },
          });
          
          // Update the user's preferences
          await db.user.update({
            where: { id: userId },
            data: { notificationPreferences: validPreferences },
          });
        } else {
          // Create a new user if none exists with either ID or externalId
          user = await db.user.create({
            data: {
              id: userId,
              email: `user-${userId}@example.com`,
              name: 'New User',
              notificationPreferences: validPreferences,
              plan: 'FREE',
              apiKey: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              externalId: userId,
            },
          });
        }
      } else {
        // Update existing user's preferences
        await db.user.update({
          where: { id: user.id },
          data: { notificationPreferences: validPreferences },
        });
      }

      return NextResponse.json(validPreferences);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : 'Failed to update notification preferences',
          details: process.env.NODE_ENV === 'development' ? (error as any).message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update notification preferences' },
      { status: 500 }
    );
  }
}
