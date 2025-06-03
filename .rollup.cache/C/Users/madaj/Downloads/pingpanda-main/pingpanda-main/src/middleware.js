import { __awaiter, __generator } from "tslib";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { trackPageview } from '@/lib/plausible';
// Define public routes that don't require authentication
var publicRoutes = [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook(.*)',
    '/pricing',
    '/blog(.*)',
    '/api/trpc(.*)',
    '/_next/static(.*)',
    '/_next/image(.*)',
    '/favicon.ico',
];
// Define protected routes that require authentication
var protectedRoutes = [
    '/dashboard(.*)',
    '/welcome',
    // Protect API routes by explicitly listing them instead of using negative lookahead
    '/api/auth(.*)',
    '/api/waitlists(.*)',
    '/api/subscribers(.*)'
    // Add other API routes that need protection
];
var isPublicRoute = createRouteMatcher(publicRoutes);
var isProtectedRoute = createRouteMatcher(protectedRoutes);
var middleware = clerkMiddleware(function (auth, req) { return __awaiter(void 0, void 0, void 0, function () {
    var pathname, userId, signInUrl, dashboardUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pathname = req.nextUrl.pathname;
                // Skip middleware for public routes
                if (isPublicRoute(req)) {
                    trackPageview();
                    return [2 /*return*/, NextResponse.next()];
                }
                // Track page views for authenticated users
                trackPageview();
                return [4 /*yield*/, auth()];
            case 1:
                userId = (_a.sent()).userId;
                // Handle unauthenticated users trying to access protected routes
                if (!userId && isProtectedRoute(req)) {
                    signInUrl = new URL('/sign-in', req.url);
                    signInUrl.searchParams.set('redirect_url', pathname);
                    return [2 /*return*/, NextResponse.redirect(signInUrl)];
                }
                // Handle authenticated users trying to access auth routes
                if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
                    dashboardUrl = new URL('/dashboard', req.url);
                    return [2 /*return*/, NextResponse.redirect(dashboardUrl)];
                }
                return [2 /*return*/, NextResponse.next()];
        }
    });
}); });
export default middleware;
export var config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - public folder
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        // Always run for API routes
        '/(api|trpc)(.*)'
    ]
};
//# sourceMappingURL=middleware.js.map