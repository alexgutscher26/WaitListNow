import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import type { NextRequest } from 'next/server';
import { format } from 'date-fns';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the user
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Parse request body
    const { waitlistId, subscriberIds } = await req.json();

    if (!waitlistId) {
      return new NextResponse('Waitlist ID is required', { status: 400 });
    }

    // Verify the user owns the waitlist
    const waitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id,
      },
    });

    if (!waitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Get subscribers
    const whereClause = {
      waitlistId,
      ...(subscriberIds?.length > 0 && { id: { in: subscriberIds } }),
    };

    const subscribers = await db.subscriber.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    // Format subscribers for CSV
    const headers = ['Email', 'Name', 'Status', 'Referral Code', 'Referred By', 'Joined At'];

    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const sub of subscribers) {
      const row = [
        `"${sub.email}"`,
        `"${sub.name || ''}"`,
        `"${sub.status}"`,
        `"${sub.referralCode || ''}"`,
        `"${sub.referredBy || ''}"`,
        `"${format(new Date(sub.createdAt), 'yyyy-MM-dd HH:mm:ss')}"`,
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = csvRows.join('\n');
    const filename = `subscribers-${waitlist.slug}-${format(new Date(), 'yyyy-MM-dd')}.csv`;

    // Return the CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('[SUBSCRIBERS_EXPORT]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
