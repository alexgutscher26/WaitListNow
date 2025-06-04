import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return NextResponse.json({ error: 'Token and email are required' }, { status: 400 });
  }

  // Find the subscriber
  const subscriber = await db.subscriber.findFirst({
    where: { email },
    select: { id: true, customFields: true, status: true },
  });

  if (!subscriber) {
    return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
  }

  // Check if token matches
  const customFields = subscriber.customFields as any;
  if (customFields?.verificationToken !== token) {
    return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
  }

  // Update subscriber status to VERIFIED
  await db.subscriber.update({
    where: { id: subscriber.id },
    data: {
      status: 'VERIFIED',
      customFields: {
        ...customFields,
        emailVerified: true,
        emailVerifiedAt: new Date().toISOString(),
      },
    },
  });

  // Redirect to a success page or return a message
  return NextResponse.redirect(new URL('/verification-success', request.url));
}
