import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server';

interface CustomFields {
  verificationToken?: string;
  [key: string]: any; // Allow other custom fields
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to send verification email
export async function POST(request: Request) {
  const { email, verificationToken } = await request.json();

  if (!email || !verificationToken) {
    return NextResponse.json(
      { error: 'Email and verification token are required' },
      { status: 400 },
    );
  }

  try {
    await resend.emails.send({
      from: 'WaitListNow <verification@waitlistnow.app>',
      to: email,
      subject: 'Please verify your email address - WaitListNow',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 font-sans">
          <div class="max-w-2xl mx-auto p-6">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <div class="text-center">
                  <h1 class="text-2xl font-bold text-white">WaitListNow</h1>
                  <p class="text-blue-100 mt-2">Email Verification Required</p>
                </div>
              </div>
              
              <!-- Content -->
              <div class="px-8 py-8">
                <div class="text-center mb-6">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">Verify Your Email Address</h2>
                </div>
                
                <div class="text-gray-600 space-y-4 mb-8">
                  <p>Hi there! 👋</p>
                  <p>Thank you for joining WaitListNow! To complete your registration and secure your account, we need to verify your email address.</p>
                  <p>Click the button below to verify your email and get started:</p>
                </div>
                
                <!-- CTA Button -->
                <div class="text-center mb-8">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${encodeURIComponent(email)}" 
                     class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    ✉️ Verify Email Address
                  </a>
                </div>
                
                <!-- Alternative Link -->
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                  <p class="text-sm text-gray-600 mb-2">
                    <strong>Can't click the button?</strong> Copy and paste this link into your browser:
                  </p>
                  <div class="bg-white p-3 rounded border text-xs text-gray-800 break-all font-mono">
                    ${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${encodeURIComponent(email)}
                  </div>
                </div>
                
                <!-- Security Notice -->
                <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <div>
                      <p class="text-sm text-amber-800">
                        <strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. 
                        If you didn't create an account with WaitListNow, you can safely ignore this email.
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Help Section -->
                <div class="text-center text-sm text-gray-500">
                  <p>Need help? Contact us at support@waitlistnow.app</p>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="bg-gray-50 px-8 py-6 border-t">
                <div class="text-center text-sm text-gray-500 space-y-2">
                  <p>&copy; ${new Date().getFullYear()} WaitListNow. All rights reserved.</p>
                  <p>This email was sent to <span class="font-medium">${email}</span></p>
                  <p>If you didn't request this verification, you can safely ignore this email.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text fallback for better email client compatibility
      text: `
Hi there!

Thank you for joining WaitListNow! To complete your registration, please verify your email address by visiting this link:

${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${encodeURIComponent(email)}

This verification link will expire in 24 hours for your security.

If you didn't create an account with WaitListNow, you can safely ignore this email.

Need help? Contact us at support@waitlistnow.app

© ${new Date().getFullYear()} WaitListNow. All rights reserved.
      `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
  }
}

// Endpoint to verify email using token
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return NextResponse.json({ error: 'Token and email are required' }, { status: 400 });
  }

  try {
    // Find subscriber by email
    const subscriber = await db.subscriber.findFirst({
      where: { email },
      select: {
        id: true,
        customFields: true,
        status: true,
      },
    });

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    // Check if token matches
    const customFields = subscriber.customFields as CustomFields | null;
    const storedToken = customFields?.verificationToken;
    if (storedToken !== token) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
    }

    // Update subscriber status to VERIFIED
    const currentFields = (subscriber.customFields || {}) as CustomFields;
    await db.subscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'VERIFIED',
        customFields: {
          ...currentFields,
          emailVerified: true,
          emailVerifiedAt: new Date().toISOString(),
        } as CustomFields,
      },
    });

    return NextResponse.redirect(new URL('/verification-success', request.url));
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
  }
}
