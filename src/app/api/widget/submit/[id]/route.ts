import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Define validation schema
const submissionSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  fields: z.record(z.any()).optional(),
  referralCode: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Get waitlist
    const waitlist = await db.waitlist.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        settings: true,
        requireEmailVerification: true,
      },
    });

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = submissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { email, name, fields, referralCode } = validation.data;
    
    // Check for existing subscriber
    const existingSubscriber = await db.subscriber.findFirst({
      where: {
        email,
        waitlistId: waitlist.id,
      },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'You are already on the waitlist!' },
        { status: 400 }
      );
    }

    // Create subscriber
    const subscriber = await db.subscriber.create({
      data: {
        id: uuidv4(),
        email,
        name: name || null,
        waitlistId: waitlist.id,
        fields: fields || {},
        referralCode: referralCode || null,
        isVerified: !waitlist.requireEmailVerification,
      },
    });

    // TODO: Send verification email if required
    // if (waitlist.requireEmailVerification) {
    //   await sendVerificationEmail(subscriber);
    // }


    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist!',
        requiresVerification: waitlist.requireEmailVerification
      },
      { headers }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
