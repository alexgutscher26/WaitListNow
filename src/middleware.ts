import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';
import { trackPageview } from '@/lib/plausible';

// Define public routes that don't require authentication
const publicRoutes = [
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
const protectedRoutes = [
  '/dashboard(.*)',
  '/welcome',
  '/api/auth(.*)',
  '/api/subscribers(.*)'
  // Add other API routes that need protection
];

const isPublicRoute = createRouteMatcher(publicRoutes);
const isProtectedRoute = createRouteMatcher(protectedRoutes);

const middleware = clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;
  
  // Skip middleware for public routes
  if (isPublicRoute(req)) {
    trackPageview();
    return NextResponse.next();
  }

  // Track page views for authenticated users
  trackPageview();

  // Get the auth state
  const { userId } = await auth();

  // Handle unauthenticated users trying to access protected routes
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Handle authenticated users trying to access auth routes
  if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Protect dashboard and private API routes
    '/dashboard/:path*',
    '/api/private/:path*'
  ]
};
