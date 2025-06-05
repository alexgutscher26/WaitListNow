import { __awaiter, __generator } from 'tslib';
import { NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
// Disable caching for this route
export var dynamic = 'force-dynamic';
// Rate limiting configuration
var limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export var runtime = 'nodejs';
export function GET() {
  return __awaiter(this, void 0, void 0, function () {
    var identifier,
      success,
      user,
      dbUser,
      userByEmail,
      allUsers,
      dbError_1,
      users,
      queryError_1,
      responseHeaders,
      error_1,
      errorMessage;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          _e.trys.push([0, 16, , 17]);
          return [4 /*yield*/, getHeaders()];
        case 1:
          identifier = _e.sent().get('x-forwarded-for') || 'unknown';
          return [4 /*yield*/, limiter.check(10, identifier)];
        case 2:
          success = _e.sent().success;
          if (!success) {
            return [
              2 /*return*/,
              NextResponse.json(
                { success: false, error: 'Too many requests' },
                {
                  status: 429,
                  headers: {
                    'Retry-After': '60',
                    'Cache-Control': 'no-store, max-age=0',
                  },
                },
              ),
            ];
          }
          return [4 /*yield*/, currentUser()];
        case 3:
          user = _e.sent();
          if (!user) {
            return [
              2 /*return*/,
              NextResponse.json(
                { success: false, error: 'Unauthorized' },
                {
                  status: 401,
                  headers: { 'Cache-Control': 'no-store, max-age=0' },
                },
              ),
            ];
          }
          dbUser = null;
          _e.label = 4;
        case 4:
          _e.trys.push([4, 10, , 11]);
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { id: user.id },
              select: {
                id: true,
                email: true,
                createdAt: true,
              },
            }),
          ];
        case 5:
          // First try to find by Clerk ID
          dbUser = _e.sent();
          if (
            !(
              !dbUser &&
              ((_b = (_a = user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) ===
                null || _b === void 0
                ? void 0
                : _b.emailAddress)
            )
          )
            return [3 /*break*/, 7];
          return [
            4 /*yield*/,
            db.user.findFirst({
              where: { email: user.emailAddresses[0].emailAddress },
              select: {
                id: true,
                email: true,
                createdAt: true,
              },
            }),
          ];
        case 6:
          userByEmail = _e.sent();
          dbUser = userByEmail;
          _e.label = 7;
        case 7:
          if (dbUser) return [3 /*break*/, 9];
          return [
            4 /*yield*/,
            db.user.findMany({
              select: { id: true, email: true, createdAt: true },
              take: 10,
            }),
          ];
        case 8:
          allUsers = _e.sent();
          // console.log('First 10 users in DB:', allUsers);
          return [
            2 /*return*/,
            NextResponse.json(
              {
                success: false,
                error: 'User not found',
                debug: {
                  clerkUserId: user.id,
                  clerkEmail:
                    (_d = (_c = user.emailAddresses) === null || _c === void 0 ? void 0 : _c[0]) ===
                      null || _d === void 0
                      ? void 0
                      : _d.emailAddress,
                  dbUsersSample: allUsers,
                },
              },
              {
                status: 404,
                headers: {
                  'Cache-Control': 'no-store, max-age=0',
                  'X-Content-Type-Options': 'nosniff',
                },
              },
            ),
          ];
        case 9:
          return [3 /*break*/, 11];
        case 10:
          dbError_1 = _e.sent();
          console.error('Database error:', dbError_1);
          return [
            2 /*return*/,
            NextResponse.json(
              { success: false, error: 'Database error' },
              {
                status: 500,
                headers: { 'Cache-Control': 'no-store, max-age=0' },
              },
            ),
          ];
        case 11:
          users = [];
          _e.label = 12;
        case 12:
          _e.trys.push([12, 14, , 15]);
          return [
            4 /*yield*/,
            db.user.findMany({
              take: 1,
              select: {
                id: true,
                email: true,
                createdAt: true,
              },
              orderBy: { createdAt: 'desc' },
            }),
          ];
        case 13:
          users = _e.sent();
          return [3 /*break*/, 15];
        case 14:
          queryError_1 = _e.sent();
          console.error('Query error:', queryError_1);
          return [
            2 /*return*/,
            NextResponse.json(
              { success: false, error: 'Query error' },
              {
                status: 500,
                headers: { 'Cache-Control': 'no-store, max-age=0' },
              },
            ),
          ];
        case 15:
          responseHeaders = {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
            'Cache-Control': 'no-store, max-age=0',
          };
          return [
            2 /*return*/,
            NextResponse.json(
              {
                success: true,
                users: users.map(function (u) {
                  return {
                    id: u.id,
                    email: u.email,
                    // Don't expose sensitive information
                    createdAt: u.createdAt.toISOString(),
                  };
                }),
                message: 'Database connection successful!',
              },
              {
                headers: responseHeaders,
              },
            ),
          ];
        case 16:
          error_1 = _e.sent();
          console.error('Database connection error:', error_1);
          errorMessage =
            process.env.NODE_ENV === 'development'
              ? error_1 instanceof Error
                ? error_1.message
                : 'Unknown error'
              : 'Internal server error';
          return [
            2 /*return*/,
            NextResponse.json(
              {
                success: false,
                error: errorMessage,
              },
              {
                status: 500,
                headers: {
                  'Cache-Control': 'no-store, max-age=0',
                  'X-Content-Type-Options': 'nosniff',
                },
              },
            ),
          ];
        case 17:
          return [2 /*return*/];
      }
    });
  });
}
//# sourceMappingURL=route.js.map
