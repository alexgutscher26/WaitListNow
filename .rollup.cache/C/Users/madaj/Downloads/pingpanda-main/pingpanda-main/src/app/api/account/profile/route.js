import { __awaiter, __generator } from "tslib";
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
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, userId, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authUser = _a.sent();
                    userId = authUser.userId;
                    if (!userId) {
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    }
                    return [4 /*yield*/, db.user.findUnique({
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
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, NextResponse.json({ error: 'User not found' }, { status: 404 })];
                    }
                    return [2 /*return*/, NextResponse.json(user)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching profile:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
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
export function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authUser, userId, data, updatedUser, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authUser = _b.sent();
                    userId = authUser.userId;
                    if (!userId) {
                        return [2 /*return*/, NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _b.sent();
                    // Validate required fields
                    if (!((_a = data.name) === null || _a === void 0 ? void 0 : _a.trim())) {
                        return [2 /*return*/, NextResponse.json({ error: 'Name is required' }, { status: 400 })];
                    }
                    return [4 /*yield*/, db.user.update({
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
                        })];
                case 3:
                    updatedUser = _b.sent();
                    return [2 /*return*/, NextResponse.json(updatedUser)];
                case 4:
                    error_2 = _b.sent();
                    console.error('Error updating profile:', error_2);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map