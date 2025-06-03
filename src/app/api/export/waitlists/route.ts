import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { format } from 'date-fns';

/**
 * Export user waitlists with subscribers in CSV format.
 *
 * This function handles the export of waitlist data including subscriber information
 * to a CSV file. It fetches the waitlists associated with the authenticated user,
 * processes the data into CSV format, and returns it as a downloadable response.
 *
 * @returns A NextResponse object containing the CSV file or an error message.
 */
export async function GET() {
  try {
    const authResponse = await auth();
    const userId = authResponse.userId;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's waitlists with subscribers
    const waitlists = await db.waitlist.findMany({
      where: {
        user: {
          externalId: userId,
        },
      },
      include: {
        subscribers: {
          select: {
            email: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            referralCode: true,
            referredBy: true,
          },
        },
      },
    });

    if (!waitlists || waitlists.length === 0) {
      return new NextResponse('No waitlists found', { status: 404 });
    }

    // Convert waitlists to CSV format
    let csvContent =
      'Waitlist Name,Subscriber Email,Status,Signup Date,Last Updated,Referral Code,Referred By\n';

    waitlists.forEach((waitlist) => {
      if (waitlist.subscribers && waitlist.subscribers.length > 0) {
        waitlist.subscribers.forEach((subscriber) => {
          csvContent += `"${waitlist.name.replace(/"/g, '""')}",`;
          csvContent += `"${subscriber.email}",`;
          csvContent += `"${subscriber.status}",`;
          csvContent += `"${format(new Date(subscriber.createdAt), 'yyyy-MM-dd HH:mm:ss')}",`;
          csvContent += `"${subscriber.updatedAt ? format(new Date(subscriber.updatedAt), 'yyyy-MM-dd HH:mm:ss') : ''}",`;
          csvContent += `"${subscriber.referralCode || ''}",`;
          csvContent += `"${subscriber.referredBy || ''}"\n`;
        });
      } else {
        // Include waitlist even if it has no subscribers
        csvContent += `"${waitlist.name.replace(/"/g, '""')}",,,,,,\n`;
      }
    });

    // Create a response with the CSV file
    const response = new NextResponse(csvContent);

    // Set headers for file download
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set(
      'Content-Disposition',
      `attachment; filename=waitlist-export-${format(new Date(), 'yyyy-MM-dd')}.csv`,
    );

    return response;
  } catch (error) {
    console.error('Export error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
