/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkMiddleware } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { trackPageview } from '@/lib/plausible';

const middleware = async (req: NextRequest, event: any) => {
  try {
    // Track page views
    trackPageview();

    // Call the Clerk middleware with both request and event
    const response = await clerkMiddleware()(req, event)
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    )
  }
}

export default middleware

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/dashboard(.*)",
    "/welcome",
  ],
}
