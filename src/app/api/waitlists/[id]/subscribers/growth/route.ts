import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface SubscriberGrowthData {
  date: string;
  count: number;
  cumulative: number;
}

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // First get the database user
    const dbUser = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!dbUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Verify the waitlist belongs to the user
    const waitlist = await db.waitlist.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!waitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Get the number of days from query params, default to 30
    const { searchParams } = new URL(request.url);
    const days = Math.min(Number(searchParams.get('days')) || 30, 365);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily subscriber counts
    const dailyCounts = await db.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT 
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(*)::bigint as count
      FROM "Subscriber"
      WHERE 
        "waitlistId" = ${id}
        AND "createdAt" >= ${startDate}
        AND "createdAt" <= ${endDate}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date ASC
    `;

    // Get the count of subscribers before the start date
    const initialCount = await db.subscriber.count({
      where: {
        waitlistId: id,
        createdAt: { lt: startDate },
      },
    });

    // Generate data points for all days in the range, even if there are no subscribers
    const dateMap = new Map<string, number>();
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateMap.set(dateStr, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fill in the actual counts
    dailyCounts.forEach((item) => {
      const dateStr = new Date(item.date).toISOString().split('T')[0];
      dateMap.set(dateStr, Number(item.count));
    });

    // Convert to array and calculate cumulative
    let runningTotal = initialCount;
    const result: SubscriberGrowthData[] = [];

    // Sort dates in ascending order
    const sortedDates = Array.from(dateMap.entries()).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
    );

    for (const [date, count] of sortedDates) {
      runningTotal += count;
      result.push({
        date,
        count,
        cumulative: runningTotal,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching subscriber growth data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
