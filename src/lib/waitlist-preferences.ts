import { db } from '@/lib/db';


// Custom error class for waitlist preferences errors
export class WaitlistPreferencesError extends Error {
  constructor(
    message: string,
    public code: string = 'WAITLIST_PREFERENCES_ERROR',
  ) {
    super(message);
    this.name = 'WaitlistPreferencesError';
  }
}

export interface WaitlistPreferences {
  defaultWaitlistLimit: number;
  autoApproveSubscribers: boolean;
  emailNotifications: boolean;
  maxSubscribers: number;
  requireEmailVerification: boolean;
}

export const defaultWaitlistPreferences: WaitlistPreferences = {
  defaultWaitlistLimit: 1,
  autoApproveSubscribers: true,
  emailNotifications: true,
  maxSubscribers: 1000,
  requireEmailVerification: false,
};

export async function getUserWaitlistPreferences(userId: string): Promise<WaitlistPreferences> {
  if (!userId) {
    throw new WaitlistPreferencesError('User ID is required', 'USER_ID_REQUIRED');
  }

  try {
    console.log(`[getUserWaitlistPreferences] Fetching preferences for user: ${userId}`);

    // First try to get the user with raw SQL
    const result = await db.$queryRaw<Array<{ waitlist_preferences: string | null }>>`
      SELECT "waitlist_preferences" as waitlist_preferences
      FROM "User" 
      WHERE "externalId" = ${userId}
      LIMIT 1
    `;

    if (!result || result.length === 0) {
      console.warn(`[getUserWaitlistPreferences] User not found: ${userId}`);
      throw new WaitlistPreferencesError('User not found', 'USER_NOT_FOUND');
    }

    const prefsJson = result[0]?.waitlist_preferences;

    // If no preferences exist yet, return defaults
    if (!prefsJson) {
      console.log(
        `[getUserWaitlistPreferences] No preferences found for user ${userId}, returning defaults`,
      );
      return { ...defaultWaitlistPreferences };
    }

    // Parse the preferences
    let prefs: Partial<WaitlistPreferences>;
    try {
      prefs = typeof prefsJson === 'string' ? JSON.parse(prefsJson) : prefsJson;
    } catch (parseError) {
      console.error(
        `[getUserWaitlistPreferences] Error parsing preferences for user ${userId}:`,
        parseError,
      );
      // If parsing fails, return defaults
      return { ...defaultWaitlistPreferences };
    }

    // Merge with defaults to ensure all fields are present
    const mergedPrefs = {
      ...defaultWaitlistPreferences,
      ...prefs,
    };

    console.log(
      `[getUserWaitlistPreferences] Successfully retrieved preferences for user ${userId}`,
    );
    return mergedPrefs;
  } catch (error) {
    console.error(`[getUserWaitlistPreferences] Error for user ${userId}:`, error);

    // If it's our custom error, rethrow it
    if (error instanceof WaitlistPreferencesError) {
      throw error;
    }

    // For other errors, wrap in our custom error
    throw new WaitlistPreferencesError(
      error instanceof Error ? error.message : 'Failed to get waitlist preferences',
      'FETCH_PREFERENCES_FAILED',
    );
  }
}

export async function updateUserWaitlistPreferences(
  userId: string,
  updates: Partial<WaitlistPreferences>,
): Promise<WaitlistPreferences> {
  if (!userId) {
    throw new WaitlistPreferencesError('User ID is required', 'USER_ID_REQUIRED');
  }

  try {
    console.log(`[updateUserWaitlistPreferences] Updating preferences for user: ${userId}`, {
      updates,
    });

    // Get current preferences
    const currentPrefs = await getUserWaitlistPreferences(userId);

    // Merge with updates
    const newPrefs = {
      ...currentPrefs,
      ...updates,
      // Ensure maxSubscribers is within bounds
      maxSubscribers: Math.min(
        10000,
        Math.max(100, updates.maxSubscribers ?? currentPrefs.maxSubscribers),
      ),
    };

    console.log(`[updateUserWaitlistPreferences] New preferences for user ${userId}:`, newPrefs);

    // Update in database using raw SQL to bypass TypeScript type checking
    const result = await db.$executeRaw`
      UPDATE "User"
      SET 
        "waitlist_preferences" = ${JSON.stringify(newPrefs)}::jsonb,
        "updatedAt" = NOW()
      WHERE "externalId" = ${userId}
      RETURNING id, "waitlist_preferences" as waitlist_preferences
    `;

    if (result === 0) {
      throw new WaitlistPreferencesError('User not found', 'USER_NOT_FOUND');
    }

    console.log(
      `[updateUserWaitlistPreferences] Successfully updated preferences for user ${userId}`,
    );
    return newPrefs;
  } catch (error) {
    console.error(`[updateUserWaitlistPreferences] Error for user ${userId}:`, error);

    // If it's our custom error, rethrow it
    if (error instanceof WaitlistPreferencesError) {
      throw error;
    }

    // For other errors, wrap in our custom error
    throw new WaitlistPreferencesError(
      error instanceof Error ? error.message : 'Failed to update waitlist preferences',
      'UPDATE_PREFERENCES_FAILED',
    );
  }
}
