import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Log environment variables (excluding sensitive ones)
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? '***' : 'Not set',
      appEnv: process.env.APP_ENV,
    };

    // Get database connection info
    const dbInfo = await db.$queryRaw`SELECT current_database(), current_user, version()`;

    // Get all waitlists with subscriber counts
    const waitlists = await db.waitlist.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get total counts
    const totalWaitlists = await db.waitlist.count();
    const totalSubscribers = await db.subscriber.count();

    return NextResponse.json({
      meta: {
        timestamp: new Date().toISOString(),
        environment: envInfo,
        database: dbInfo,
        counts: {
          waitlists: totalWaitlists,
          subscribers: totalSubscribers,
        },
      },
      waitlists,
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      {
        error: 'Debug endpoint error',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}
