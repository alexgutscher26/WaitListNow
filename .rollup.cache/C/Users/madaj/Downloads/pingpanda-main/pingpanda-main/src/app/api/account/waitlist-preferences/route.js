import { __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserWaitlistPreferences, updateUserWaitlistPreferences, } from '@/lib/waitlist-preferences';
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
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, userId, preferences, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log('GET /api/account/waitlist-preferences called');
                    return [4 /*yield*/, auth()];
                case 1:
                    authUser = _a.sent();
                    userId = authUser.userId;
                    console.log('Authenticated user ID:', userId);
                    if (!userId) {
                        console.error('No user ID found in session');
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized', details: 'No user session found' }, { status: 401 })];
                    }
                    console.log('Fetching waitlist preferences for user:', userId);
                    return [4 /*yield*/, getUserWaitlistPreferences(userId)];
                case 2:
                    preferences = _a.sent();
                    console.log('Retrieved preferences:', preferences);
                    return [2 /*return*/, NextResponse.json(preferences)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error in GET /api/account/waitlist-preferences:', error_1);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Internal server error',
                            details: error_1 instanceof Error ? error_1.message : 'Unknown error',
                            stack: process.env.NODE_ENV === 'development' && error_1 instanceof Error
                                ? error_1.stack
                                : undefined,
                        }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
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
export function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, userId, updates, body, parseError_1, validationErrors, updatedPrefs, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    console.log('PUT /api/account/waitlist-preferences called');
                    return [4 /*yield*/, auth()];
                case 1:
                    authUser = _a.sent();
                    userId = authUser.userId;
                    console.log('Authenticated user ID:', userId);
                    if (!userId) {
                        console.error('No user ID found in session');
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized', details: 'No user session found' }, { status: 401 })];
                    }
                    updates = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, request.text()];
                case 3:
                    body = _a.sent();
                    console.log('Request body:', body);
                    updates = JSON.parse(body);
                    console.log('Parsed updates:', updates);
                    return [3 /*break*/, 5];
                case 4:
                    parseError_1 = _a.sent();
                    console.error('Error parsing request body:', parseError_1);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Invalid request body',
                            details: parseError_1 instanceof Error ? parseError_1.message : 'Failed to parse JSON',
                        }, { status: 400 })];
                case 5:
                    validationErrors = [];
                    if (updates.autoApproveSubscribers !== undefined &&
                        typeof updates.autoApproveSubscribers !== 'boolean') {
                        validationErrors.push('autoApproveSubscribers must be a boolean');
                    }
                    if (updates.emailNotifications !== undefined &&
                        typeof updates.emailNotifications !== 'boolean') {
                        validationErrors.push('emailNotifications must be a boolean');
                    }
                    if (updates.requireEmailVerification !== undefined &&
                        typeof updates.requireEmailVerification !== 'boolean') {
                        validationErrors.push('requireEmailVerification must be a boolean');
                    }
                    if (updates.maxSubscribers !== undefined &&
                        (typeof updates.maxSubscribers !== 'number' ||
                            updates.maxSubscribers < 100 ||
                            updates.maxSubscribers > 10000)) {
                        validationErrors.push('maxSubscribers must be a number between 100 and 10000');
                    }
                    if (updates.defaultWaitlistLimit !== undefined &&
                        (typeof updates.defaultWaitlistLimit !== 'number' || updates.defaultWaitlistLimit < 1)) {
                        validationErrors.push('defaultWaitlistLimit must be a number greater than 0');
                    }
                    if (validationErrors.length > 0) {
                        console.error('Validation errors:', validationErrors);
                        return [2 /*return*/, NextResponse.json({
                                error: 'Invalid input data',
                                details: validationErrors,
                            }, { status: 400 })];
                    }
                    console.log('Updating preferences for user:', userId, 'with:', updates);
                    return [4 /*yield*/, updateUserWaitlistPreferences(userId, updates)];
                case 6:
                    updatedPrefs = _a.sent();
                    console.log('Successfully updated preferences:', updatedPrefs);
                    return [2 /*return*/, NextResponse.json(updatedPrefs)];
                case 7:
                    error_2 = _a.sent();
                    console.error('Error in PUT /api/account/waitlist-preferences:', error_2);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Failed to update waitlist preferences',
                            details: error_2 instanceof Error ? error_2.message : 'Unknown error',
                            stack: process.env.NODE_ENV === 'development' && error_2 instanceof Error
                                ? error_2.stack
                                : undefined,
                        }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map