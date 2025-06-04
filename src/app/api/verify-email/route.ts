import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';

interface CustomFields {
  verificationToken?: string;
  [key: string]: any; // Allow other custom fields
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to send verification email
export async function POST(request: Request) {
  console.log('Received verify-email POST body:', await request.clone().json());

  const { email, verificationToken } = await request.json();

  if (!email || !verificationToken) {
    return NextResponse.json(
      { error: 'Email and verification token are required' },
      { status: 400 },
    );
  }

  try {
    const result = await resend.emails.send({
      from: 'WaitListNow <onboarding@resend.dev>',
      to: email,
      subject: 'Please verify your email address - WaitListNow',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="background: #f9fafb; font-family: Arial, sans-serif; color: #374151; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #6366f1 0%, #a21caf 100%); padding: 32px 24px; text-align: center; color: #fff;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">WaitListNow</h1>
                <p style="margin: 8px 0 0 0; font-size: 16px;">Email Verification Required</p>
              </div>
              <!-- Content -->
              <div style="padding: 32px 24px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: #e0e7ff; border-radius: 50%; margin-bottom: 16px;">
                    <svg width="32" height="32" fill="none" stroke="#6366f1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <h2 style="color: #111827; font-size: 22px; font-weight: 700; margin: 0 0 16px 0;">Verify Your Email Address</h2>
                </div>
                <div style="color: #6b7280; font-size: 16px; margin-bottom: 24px; line-height: 1.7;">
                  <p>Hi there! 👋</p>
                  <p>Thank you for joining WaitListNow! To complete your registration and secure your account, we need to verify your email address.</p>
                  <p>Click the button below to verify your email and get started:</p>
                </div>
                <!-- CTA Button -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${encodeURIComponent(email)}" 
                     style="display: inline-block; background: #6366f1;
                     background: linear-gradient(135deg, #6366f1 0%, #a21caf 100%); color: #fff; font-weight: 600; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(99,102,241,0.3); transition: all 0.2s ease;">
                    ✉️ Verify Email Address
                  </a>
                </div>
                <!-- Alternative Link -->
                <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;"><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                  <div style="background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 12px; word-break: break-all; color: #374151; margin: 0;">
                    ${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${encodeURIComponent(email)}
                  </div>
                </div>
                <!-- Security Notice -->
                <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; align-items: flex-start;">
                  <div style="flex-shrink: 0; margin-right: 12px; margin-top: 2px;">
                    <svg width="20" height="20" fill="#f59e0b" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. If you didn't create an account with WaitListNow, you can safely ignore this email.</p>
                  </div>
                </div>
                <!-- Help Section -->
                <div style="text-align: center; font-size: 14px; color: #6b7280; margin-bottom: 24px;">
                  <p>Need help? Contact us at support@waitlistnow.app</p>
                </div>
              </div>
              <!-- Footer -->
              <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">&copy; ${new Date().getFullYear()} WaitListNow. All rights reserved.</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">This email was sent to <span style="font-weight: 600; color: #374151;">${email}</span></p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">If you didn't request this verification, you can safely ignore this email.</p>
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
    console.log('Resend API response:', result);
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
