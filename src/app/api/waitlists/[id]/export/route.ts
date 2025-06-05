import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

// Helper function to convert array of objects to CSV string
function convertToCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return '';

  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV header
  let csv = headers.join(',') + '\n';

  // Add rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header] ?? '';
      // Escape quotes and wrap in quotes if contains comma or quote
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csv += values.join(',') + '\n';
  });

  return csv;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the waitlist ID from the URL parameters
    const waitlistId = params.id;

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get the waitlist to verify ownership
    const waitlist = await db.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId: user.id,
      },
    });

    if (!waitlist) {
      return new NextResponse('Waitlist not found', { status: 404 });
    }

    // Get all subscribers for this waitlist
    const subscribers = await db.subscriber.findMany({
      where: { waitlistId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        status: true,
        customFields: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform data for CSV
    const csvData = subscribers.map((subscriber) => ({
      id: subscriber.id,
      email: subscriber.email,
      name: subscriber.name || '',
      status: subscriber.status,
      joined_at: subscriber.createdAt.toISOString(),
      ...((subscriber.customFields as Record<string, unknown>) || {}),
    }));

    // Convert to CSV
    const csv = convertToCSV(csvData);
    const filename = `waitlist-${waitlist.slug}-subscribers-${new Date().toISOString().split('T')[0]}.csv`;

    // Create response with CSV data
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('[WAITLIST_EXPORT_ERROR]', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
