import { __awaiter, __generator, __spreadArray } from 'tslib';
import { NextResponse } from 'next/server';
import { getAuth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { onboardingCompleteSchema } from '@/lib/validations/onboarding';
import { z } from 'zod';
// Enable debug logging in development
var isDev = process.env.NODE_ENV === 'development';
var log = function () {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return isDev && console.log.apply(console, __spreadArray(['[Onboarding API]'], args, false));
};
// POST /api/onboarding/complete - Mark onboarding as complete
export function POST(req) {
  return __awaiter(this, void 0, void 0, function () {
    var userId,
      json,
      data,
      clerkUser,
      userEmail,
      user,
      createError_1,
      updateData,
      updatedUser,
      waitlistName,
      slug,
      waitlist,
      error_1,
      prismaError;
    var _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 12, , 13]);
          userId = getAuth(req).userId;
          if (!userId) {
            return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
          }
          return [4 /*yield*/, req.json()];
        case 1:
          json = _c.sent();
          data = onboardingCompleteSchema.parse(json);
          log('Onboarding data received:', data);
          return [4 /*yield*/, currentUser()];
        case 2:
          clerkUser = _c.sent();
          if (!clerkUser) {
            return [
              2 /*return*/,
              new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
              }),
            ];
          }
          userEmail =
            (_b = (_a = clerkUser.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) ===
              null || _b === void 0
              ? void 0
              : _b.emailAddress;
          if (!userEmail) {
            return [
              2 /*return*/,
              new NextResponse(JSON.stringify({ error: 'Email address not found' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
              }),
            ];
          }
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { externalId: userId },
            }),
          ];
        case 3:
          user = _c.sent();
          if (Boolean(user)) return [3 /*break*/, 8];
          log('User not found, creating new user with externalId:', userId);
          _c.label = 4;
        case 4:
          _c.trys.push([4, 6, , 7]);
          return [
            4 /*yield*/,
            db.user.create({
              data: {
                externalId: userId,
                email: userEmail,
                // Add any other required fields with default values
              },
            }),
          ];
        case 5:
          user = _c.sent();
          log('Created new user:', user.id);
          return [3 /*break*/, 7];
        case 6:
          createError_1 = _c.sent();
          console.error('Error creating user:', createError_1);
          return [
            2 /*return*/,
            new NextResponse(JSON.stringify({ error: 'Failed to create user' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }),
          ];
        case 7:
          return [3 /*break*/, 9];
        case 8:
          log('Found existing user:', user.id);
          _c.label = 9;
        case 9:
          updateData = {
            onboardingComplete: true,
            onboardingCompletedAt: new Date(),
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
          return [
            4 /*yield*/,
            db.user.update({
              where: { id: user.id },
              data: updateData,
              select: {
                id: true,
                email: true,
                plan: true,
                createdAt: true,
                updatedAt: true,
              }, // Use const assertion to help with type inference
            }),
          ];
        case 10:
          updatedUser = _c.sent();
          log('User updated successfully:', updatedUser.id);
          waitlistName = data.name || 'My Waitlist';
          slug = waitlistName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return [
            4 /*yield*/,
            db.waitlist.create({
              data: {
                name: waitlistName,
                slug: ''.concat(slug, '-').concat(Math.random().toString(36).substring(2, 8)),
                description: data.description || null,
                websiteUrl: data.websiteUrl || null,
                redirectUrl: data.redirectUrl || null,
                userId: user.id,
                status: 'DRAFT',
                customFields: [],
                style: {},
                settings: {},
              },
            }),
          ];
        case 11:
          waitlist = _c.sent();
          log('Created default waitlist:', waitlist.id);
          return [
            2 /*return*/,
            NextResponse.json({
              success: true,
              message: 'Onboarding completed successfully',
              user: updatedUser,
              waitlist: waitlist,
            }),
          ];
        case 12:
          error_1 = _c.sent();
          console.error('[ONBOARDING_COMPLETE]', error_1);
          log('Error details:', error_1);
          // Handle Prisma errors specifically
          if (error_1 && typeof error_1 === 'object' && 'code' in error_1) {
            prismaError = error_1;
            if (prismaError.code === 'P2002') {
              return [
                2 /*return*/,
                new NextResponse(
                  JSON.stringify({
                    error: 'Unique constraint violation',
                    details: isDev ? prismaError.message : undefined,
                  }),
                  {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' },
                  },
                ),
              ];
            }
            if (prismaError.code === 'P2025') {
              return [
                2 /*return*/,
                new NextResponse(
                  JSON.stringify({
                    error: 'Record not found',
                    details: isDev ? prismaError.message : undefined,
                  }),
                  {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                  },
                ),
              ];
            }
          }
          if (error_1 instanceof z.ZodError) {
            return [
              2 /*return*/,
              new NextResponse(
                JSON.stringify({
                  error: 'Validation error',
                  details: error_1.errors,
                }),
                {
                  status: 400,
                  headers: { 'Content-Type': 'application/json' },
                },
              ),
            ];
          }
          if (error_1 instanceof Error) {
            return [
              2 /*return*/,
              new NextResponse(
                JSON.stringify({
                  error: error_1.message,
                  stack: isDev ? error_1.stack : undefined,
                }),
                {
                  status: 500,
                  headers: { 'Content-Type': 'application/json' },
                },
              ),
            ];
          }
          return [
            2 /*return*/,
            new NextResponse(
              JSON.stringify({
                error: 'Internal server error',
                details: isDev ? String(error_1) : undefined,
              }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
              },
            ),
          ];
        case 13:
          return [2 /*return*/];
      }
    });
  });
}
//# sourceMappingURL=route.js.map
