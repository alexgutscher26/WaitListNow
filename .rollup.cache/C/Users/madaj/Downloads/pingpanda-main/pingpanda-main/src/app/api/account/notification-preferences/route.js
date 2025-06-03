import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
// Default notification preferences
var defaultPreferences = {
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
/**
 * Parses and normalizes notification preferences from a given object.
 *
 * This function checks each preference key in the input object to ensure it is a boolean.
 * If a preference is missing or not a boolean, it defaults to the corresponding value from `defaultPreferences`.
 *
 * @param prefs - An object containing user-defined notification preferences.
 * @returns A normalized object of notification preferences with boolean values.
 */
function parseNotificationPreferences(prefs) {
    if (!prefs || typeof prefs !== 'object') {
        return __assign({}, defaultPreferences);
    }
    return {
        email: typeof prefs.email === 'boolean' ? prefs.email : defaultPreferences.email,
        waitlistMilestones: typeof prefs.waitlistMilestones === 'boolean'
            ? prefs.waitlistMilestones
            : defaultPreferences.waitlistMilestones,
        dailyReports: typeof prefs.dailyReports === 'boolean'
            ? prefs.dailyReports
            : defaultPreferences.dailyReports,
        weeklyDigest: typeof prefs.weeklyDigest === 'boolean'
            ? prefs.weeklyDigest
            : defaultPreferences.weeklyDigest,
        signupAlerts: typeof prefs.signupAlerts === 'boolean'
            ? prefs.signupAlerts
            : defaultPreferences.signupAlerts,
        integrationUpdates: typeof prefs.integrationUpdates === 'boolean'
            ? prefs.integrationUpdates
            : defaultPreferences.integrationUpdates,
        securityAlerts: typeof prefs.securityAlerts === 'boolean'
            ? prefs.securityAlerts
            : defaultPreferences.securityAlerts,
        marketing: typeof prefs.marketing === 'boolean' ? prefs.marketing : defaultPreferences.marketing,
    };
}
/**
 * Fetches and returns the user's notification preferences based on authentication.
 *
 * The function first authenticates the user and retrieves their ID. It then attempts to find the user by either their internal or external ID.
 * If the user is found, it parses and returns their notification preferences. If not, it returns default preferences. Errors during this process
 * are caught and logged, with an appropriate error message returned to the client.
 *
 * @returns A JSON response containing either the user's notification preferences or a default set of preferences.
 */
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var authResult, userId, user, preferences, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResult = _a.sent();
                    if (!authResult.userId) {
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    }
                    userId = authResult.userId;
                    return [4 /*yield*/, db.user.findFirst({
                            where: {
                                OR: [{ id: userId }, { externalId: userId }],
                            },
                            select: {
                                notificationPreferences: true,
                            },
                        })];
                case 2:
                    user = _a.sent();
                    // If user not found, return default preferences
                    if (!user) {
                        return [2 /*return*/, NextResponse.json(defaultPreferences)];
                    }
                    preferences = parseNotificationPreferences(user.notificationPreferences);
                    return [2 /*return*/, NextResponse.json(preferences)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching notification preferences:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to fetch notification preferences' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles updating notification preferences for a user via a PUT request.
 *
 * This function first authenticates the request and retrieves the user's ID.
 * It then parses and validates the incoming preferences. The function checks if a user exists by either their ID or externalId.
 * If a user with the externalId already exists, it updates the user's ID to match the authenticated user ID and updates the preferences.
 * If no such user exists, it creates a new user entry with the provided details and preferences.
 * If the user already exists, it simply updates their notification preferences.
 *
 * @param request - The incoming HTTP request containing user preferences.
 * @returns A JSON response with the updated preferences or an error message.
 */
export function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authResult, userId, preferences, validPreferences, user, existingUser, error_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResult = _a.sent();
                    if (!authResult.userId) {
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    }
                    userId = authResult.userId;
                    return [4 /*yield*/, request.json()];
                case 2:
                    preferences = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 14, , 15]);
                    validPreferences = parseNotificationPreferences(preferences);
                    return [4 /*yield*/, db.user.findFirst({
                            where: {
                                OR: [{ id: userId }, { externalId: userId }],
                            },
                        })];
                case 4:
                    user = _a.sent();
                    if (Boolean(user)) return [3 /*break*/, 11];
                    return [4 /*yield*/, db.user.findFirst({
                            where: { externalId: userId },
                        })];
                case 5:
                    existingUser = _a.sent();
                    if (!existingUser) return [3 /*break*/, 8];
                    // Update the existing user's ID to match the auth user ID
                    return [4 /*yield*/, db.user.update({
                            where: { id: existingUser.id },
                            data: { id: userId },
                        })];
                case 6:
                    // Update the existing user's ID to match the auth user ID
                    _a.sent();
                    // Update the user's preferences
                    return [4 /*yield*/, db.user.update({
                            where: { id: userId },
                            data: { notificationPreferences: validPreferences },
                        })];
                case 7:
                    // Update the user's preferences
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, db.user.create({
                        data: {
                            id: userId,
                            email: "user-".concat(userId, "@example.com"),
                            name: 'New User',
                            notificationPreferences: validPreferences,
                            plan: 'FREE',
                            apiKey: Math.random().toString(36).substring(2, 15) +
                                Math.random().toString(36).substring(2, 15),
                            externalId: userId,
                        },
                    })];
                case 9:
                    // Create a new user if none exists with either ID or externalId
                    user = _a.sent();
                    _a.label = 10;
                case 10: return [3 /*break*/, 13];
                case 11: 
                // Update existing user's preferences
                return [4 /*yield*/, db.user.update({
                        where: { id: user.id },
                        data: { notificationPreferences: validPreferences },
                    })];
                case 12:
                    // Update existing user's preferences
                    _a.sent();
                    _a.label = 13;
                case 13: return [2 /*return*/, NextResponse.json(validPreferences)];
                case 14:
                    error_2 = _a.sent();
                    console.error('Error updating notification preferences:', error_2);
                    return [2 /*return*/, NextResponse.json({
                            error: error_2 instanceof Error ? error_2.message : 'Failed to update notification preferences',
                            details: process.env.NODE_ENV === 'development' ? error_2.message : undefined,
                        }, { status: 500 })];
                case 15: return [3 /*break*/, 17];
                case 16:
                    error_3 = _a.sent();
                    console.error('Error updating notification preferences:', error_3);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to update notification preferences' }, { status: 500 })];
                case 17: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map