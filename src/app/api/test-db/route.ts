import { NextResponse } from 'next/server';
import { headers as getHeaders } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

// Disable caching for this route
export const dynamic = 'force-dynamic';

type UserData = {
  id: string;
  email: string;
  createdAt: Date;
};

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Rate limiting check
    const identifier = getHeaders().get('x-forwarded-for') || 'unknown';
    const { success } = await limiter.check(10, identifier); // 10 requests per minute

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { 
          status: 429, 
          headers: { 
            'Retry-After': '60',
            'Cache-Control': 'no-store, max-age=0'
          } 
        }
      );
    }

    // Authentication check
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { 
          status: 401,
          headers: { 'Cache-Control': 'no-store, max-age=0' }
        }
      );
    }

    // Debug: Log the Clerk user ID
    console.log('Clerk User ID:', user.id);
    
    // Verify user exists in our database
    let dbUser: UserData | null = null;
    try {
      // First try to find by Clerk ID
      dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { 
          id: true,
          email: true,
          createdAt: true
        }
      });

      // If not found by Clerk ID, try to find by email
      if (!dbUser && user.emailAddresses?.[0]?.emailAddress) {
        console.log('Trying to find user by email:', user.emailAddresses[0].emailAddress);
        const userByEmail = await db.user.findFirst({
          where: { email: user.emailAddresses[0].emailAddress },
          select: { 
            id: true,
            email: true,
            createdAt: true
          }
        });
        dbUser = userByEmail;
      }

      // Debug: Log all users if still not found
      if (!dbUser) {
        console.log('User not found, listing all users:');
        const allUsers = await db.user.findMany({
          select: { id: true, email: true, createdAt: true },
          take: 10
        });
        console.log('First 10 users in DB:', allUsers);
        
        return NextResponse.json(
          { 
            success: false, 
            error: 'User not found',
            debug: {
              clerkUserId: user.id,
              clerkEmail: user.emailAddresses?.[0]?.emailAddress,
              dbUsersSample: allUsers
            }
          },
          { 
            status: 404,
            headers: { 
              'Cache-Control': 'no-store, max-age=0',
              'X-Content-Type-Options': 'nosniff'
            }
          }
        );
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database error' },
        { 
          status: 500,
          headers: { 'Cache-Control': 'no-store, max-age=0' }
        }
      );
    }

    // Simple query to test the connection - only return non-sensitive data
    let users: Array<{ id: string; email: string; createdAt: Date }> = [];
    try {
      users = await db.user.findMany({
        take: 1,
        select: { 
          id: true,
          email: true,
          createdAt: true 
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (queryError) {
      console.error('Query error:', queryError);
      return NextResponse.json(
        { success: false, error: 'Query error' },
        { 
          status: 500,
          headers: { 'Cache-Control': 'no-store, max-age=0' }
        }
      );
    }

    // Security headers
    const responseHeaders = {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Cache-Control': 'no-store, max-age=0',
    };

    return NextResponse.json(
      {
        success: true,
        users: users.map(u => ({
          id: u.id,
          email: u.email,
          // Don't expose sensitive information
          createdAt: u.createdAt.toISOString()
        })),
        message: 'Database connection successful!',
      },
      { 
        headers: responseHeaders 
      }
    );
  } catch (error) {
    console.error('Database connection error:', error);
    // Don't leak stack traces in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error instanceof Error ? error.message : 'Unknown error'
      : 'Internal server error';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  }
}
