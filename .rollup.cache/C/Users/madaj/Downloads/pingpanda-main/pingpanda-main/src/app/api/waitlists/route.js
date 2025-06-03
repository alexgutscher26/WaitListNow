import { __awaiter, __generator, __spreadArray } from 'tslib';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { waitlistFormSchema } from '@/lib/validations/waitlist';
// Enable debug logging in development
var isDev = process.env.NODE_ENV === 'development';
var log = function () {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return isDev && console.log.apply(console, __spreadArray(['[Waitlist API]'], args, false));
};
// POST /api/waitlists - Create a new waitlist
/**
 * Handles the creation of a new waitlist entry via POST request.
 *
 * The function performs several steps: retrieves user ID from authentication, validates and parses JSON body,
 * fetches or creates a user, generates a slug for the waitlist name, checks for existing waitlists with the same name,
 * and finally creates a new waitlist entry if all validations pass. It also handles errors by logging them and returning
 * appropriate error responses.
 *
 * @param req - The request object containing user authentication details and body data.
 * @returns A NextResponse object with either the created waitlist or an error message.
 */
export function POST(req) {
  return __awaiter(this, void 0, void 0, function () {
    var userId, json, body, user, email, slug, existingWaitlist, waitlist, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 7, , 8]);
          userId = getAuth(req).userId;
          if (!userId) {
            return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
          }
          return [4 /*yield*/, req.json()];
        case 1:
          json = _a.sent();
          body = waitlistFormSchema.parse(json);
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { externalId: userId },
            }),
          ];
        case 2:
          user = _a.sent();
          if (Boolean(user)) return [3 /*break*/, 4];
          email = json.email;
          if (!email) {
            return [2 /*return*/, new NextResponse('Email is required', { status: 400 })];
          }
          return [
            4 /*yield*/,
            db.user.create({
              data: {
                externalId: userId,
                email: email,
              },
            }),
          ];
        case 3:
          user = _a.sent();
          _a.label = 4;
        case 4:
          // Generate a slug from the waitlist name
          if (!body.name || typeof body.name !== 'string') {
            return [
              2 /*return*/,
              new NextResponse('Waitlist name is required and must be a string', { status: 400 }),
            ];
          }
          slug = body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          return [
            4 /*yield*/,
            db.waitlist.findFirst({
              where: {
                slug: slug,
                userId: user.id,
              },
            }),
          ];
        case 5:
          existingWaitlist = _a.sent();
          if (existingWaitlist) {
            return [
              2 /*return*/,
              new NextResponse('You already have a waitlist with this name', {
                status: 400,
              }),
            ];
          }
          return [
            4 /*yield*/,
            db.waitlist.create({
              data: {
                name: body.name,
                slug: slug,
                description: body.description || null,
                websiteUrl: body.websiteUrl || null,
                redirectUrl: body.redirectUrl || null,
                userId: user.id,
                status: 'DRAFT',
                customFields: body.customFields || [],
                style: body.style || {},
                settings: body.settings || {},
              },
            }),
          ];
        case 6:
          waitlist = _a.sent();
          return [2 /*return*/, NextResponse.json(waitlist)];
        case 7:
          error_1 = _a.sent();
          console.error('[WAITLISTS_POST]', error_1);
          log('Error details:', error_1);
          if (error_1 instanceof Error) {
            log('Error stack:', error_1.stack);
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
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
// GET /api/waitlists - Get all waitlists for the current user
/**
 * Handles GET requests to fetch waitlists for a user.
 *
 * This function retrieves the user ID from the request authentication, checks if the user exists in the database,
 * and then fetches all waitlists associated with that user. It handles errors by logging them and returning appropriate HTTP responses.
 *
 * @param req - The incoming request object.
 * @returns A NextResponse containing either the fetched waitlists or an error message.
 */
export function GET(req) {
  return __awaiter(this, void 0, void 0, function () {
    var userId, user, waitlists, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          console.log('[WAITLISTS_GET] Fetching waitlists...');
          userId = getAuth(req).userId;
          // console.log('[WAITLISTS_GET] User ID from auth:', userId);
          if (!userId) {
            // console.error('[WAITLISTS_GET] No user ID found in session');
            return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
          }
          return [
            4 /*yield*/,
            db.user.findUnique({
              where: { externalId: userId },
            }),
          ];
        case 1:
          user = _a.sent();
          // console.log('[WAITLISTS_GET] Found user:', user?.id);
          if (!user) {
            console.error('[WAITLISTS_GET] User not found in database');
            return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
          }
          return [
            4 /*yield*/,
            db.waitlist.findMany({
              where: {
                userId: user.id,
              },
              include: {
                _count: {
                  select: {
                    subscribers: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            }),
          ];
        case 2:
          waitlists = _a.sent();
          // console.log(`[WAITLISTS_GET] Found ${waitlists.length} waitlists`);
          return [2 /*return*/, NextResponse.json(waitlists)];
        case 3:
          error_2 = _a.sent();
          console.error('[WAITLISTS_GET]', error_2);
          log('Error details:', error_2);
          if (error_2 instanceof Error) {
            log('Error stack:', error_2.stack);
            return [
              2 /*return*/,
              new NextResponse(
                JSON.stringify({
                  error: error_2.message,
                  stack: isDev ? error_2.stack : undefined,
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
                details: isDev ? String(error_2) : undefined,
              }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
              },
            ),
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
//# sourceMappingURL=route.js.map
