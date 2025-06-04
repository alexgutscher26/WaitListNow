import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

interface CustomFields {
  verificationToken?: string;
  [key: string]: unknown;
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Define a type alias for error with response
type ErrorWithResponse = Error & { response?: Response };

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  // console.log('Request origin:', origin);

  try {
    // Verify authentication
    const auth = getAuth(request);
    const userId = auth.userId;
    if (!userId) {
      // console.log('Unauthorized: No user ID found');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    // Find the subscriber
    const subscriber = await db.subscriber.findFirst({
      where: { email },
      include: {
        waitlist: {
          include: {
            user: {
              select: { externalId: true },
            },
          },
        },
      },
    });

    // Verify the user owns the waitlist
    if (!subscriber || subscriber.waitlist.user.externalId !== userId) {
      return new NextResponse('Subscriber not found', { status: 404 });
    }

    // Generate a new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Update subscriber with verification token
    const currentFields = (subscriber.customFields || {}) as CustomFields;
    await db.subscriber.update({
      where: { id: subscriber.id },
      data: {
        customFields: {
          ...currentFields,
          verificationToken,
        } as any,
      },
    });

    // Send verification email
    try {
      // console.log('Sending verification email to:', email);
      // Use the full URL for the verification endpoint
      const verifyUrl = new URL('/api/verify-email', origin).toString();
      const verificationUrl = `${verifyUrl}?token=${verificationToken}&email=${encodeURIComponent(email)}`;
      // console.log('Full verification URL:', verificationUrl);
      // console.log('Verification URL:', verifyUrl);

      const emailData = {
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
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #374151;
                margin: 0;
                padding: 0;
                background-color: #f9fafb;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .email-wrapper {
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -0.025em;
              }
              .header p {
                margin: 8px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
              }
              .content {
                padding: 40px 30px;
              }
              .icon-container {
                text-align: center;
                margin-bottom: 30px;
              }
              .icon-bg {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                background-color: #ede9fe;
                border-radius: 50%;
                margin-bottom: 20px;
              }
              .content h2 {
                color: #111827;
                font-size: 24px;
                font-weight: 700;
                margin: 0 0 20px 0;
                text-align: center;
              }
              .content p {
                color: #6b7280;
                font-size: 16px;
                margin: 0 0 20px 0;
                line-height: 1.7;
              }
              .cta-container {
                text-align: center;
                margin: 40px 0;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: black;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.3);
                transition: all 0.2s ease;
              }
              .cta-button:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.4);
              }
              .alternative-section {
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
              }
              .alternative-section p {
                margin: 0 0 10px 0;
                font-size: 14px;
                color: #6b7280;
              }
              .alternative-section .url {
                background-color: #ffffff;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                padding: 12px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                word-break: break-all;
                color: #374151;
                margin: 0;
              }
              .security-notice {
                background-color: #fef3c7;
                border: 1px solid #fcd34d;
                border-radius: 8px;
                padding: 16px;
                margin: 30px 0;
                display: flex;
                align-items: flex-start;
              }
              .security-notice-icon {
                flex-shrink: 0;
                margin-right: 12px;
                margin-top: 2px;
              }
              .security-notice p {
                margin: 0;
                font-size: 14px;
                color: #92400e;
              }
              .footer {
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
                padding: 30px;
                text-align: center;
              }
              .footer p {
                margin: 0 0 8px 0;
                font-size: 14px;
                color: #6b7280;
              }
              .footer .email-address {
                font-weight: 600;
                color: #374151;
              }
              @media only screen and (max-width: 600px) {
                .container { padding: 10px; }
                .content, .header, .footer { padding: 30px 20px; }
                .header h1 { font-size: 24px; }
                .content h2 { font-size: 20px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email-wrapper">
                <!-- Header -->
                <div class="header">
                  <h1>WaitListNow</h1>
                  <p>Email Verification Required</p>
                </div>
                
                <!-- Content -->
                <div class="content">
                  <div class="icon-container">
                    <div class="icon-bg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h2>Verify Your Email Address</h2>
                  </div>
                  
                  <p>Hello! 👋</p>
                  <p>Thank you for joining our waitlist! To complete your registration and ensure you receive important updates, we need to verify your email address.</p>
                  <p>Click the button below to verify your email and secure your spot:</p>
                  
                  <!-- CTA Button -->
                  <div class="cta-container">
                    <a href="${verificationUrl}" class="cta-button">
                      ✉️ Verify Email Address
                    </a>
                  </div>
                  
                  <!-- Alternative Link -->
                  <div class="alternative-section">
                    <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                    <div class="url">${verificationUrl}</div>
                  </div>
                  
                  <!-- Security Notice -->
                  <div class="security-notice">
                    <div class="security-notice-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style="color: #f59e0b;">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p><strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. If you didn't request to join this waitlist, you can safely ignore this email.</p>
                    </div>
                  </div>
                  
                  <p style="text-align: center; color: #9ca3af;">Need help? Contact us at support@waitlistnow.app</p>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} WaitListNow. All rights reserved.</p>
                  <p>This email was sent to <span class="email-address">${email}</span></p>
                  <p>If you didn't request this verification, you can safely ignore this email.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        // Plain text fallback for better email client compatibility
        text: `
Hello!

Thank you for joining our waitlist! To complete your registration, please verify your email address by visiting this link:

${verificationUrl}

This verification link will expire in 24 hours for your security.

If you didn't request to join this waitlist, you can safely ignore this email.

Need help? Contact us at support@waitlistnow.app

© ${new Date().getFullYear()} WaitListNow. All rights reserved.
        `,
      };

      // console.log('Sending email with data:', JSON.stringify(emailData, null, 2));

      const response = await resend.emails.send(emailData);
      // console.log('Resend API response:', JSON.stringify(response, null, 2));

      if (!response) {
        throw new Error('No response from Resend API');
      }

      return NextResponse.json({
        success: true,
        message: 'Verification email sent successfully',
      });
    } catch (emailError: unknown) {
      console.error('Failed to send email:');
      console.error('Error name:', (emailError as Error)?.name);
      console.error('Error message:', (emailError as Error)?.message);
      console.error('Error stack:', (emailError as Error)?.stack);

      if ((emailError as ErrorWithResponse).response) {
        const resp = (emailError as ErrorWithResponse).response;
        if (resp) {
          console.error('Error response data:', await resp.text());
        }
      }

      throw emailError; // This will be caught by the outer try-catch
    }
  } catch (error: unknown) {
    console.error('Error resending verification email:', error);
    return NextResponse.json({ error: 'Failed to resend verification email' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let email = searchParams.get('email');
  // Verify authentication
  const auth = getAuth(request);
  const userId = auth.userId;
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  // If email is not provided, try to get it from the authenticated user
  if (!email) {
    // Try to find the user's email from the database
    const user = await db.user.findUnique({ where: { externalId: userId } });
    if (user && user.email) {
      email = user.email;
    } else {
      return new Response(
        JSON.stringify({
          error: 'Email query parameter is required, and no email found for authenticated user.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }
  // Find the subscriber
  const subscriber = await db.subscriber.findFirst({
    where: { email },
    include: {
      waitlist: {
        include: {
          user: {
            select: { externalId: true },
          },
        },
      },
    },
  });
  if (!subscriber || subscriber.waitlist.user.externalId !== userId) {
    return new NextResponse('Subscriber not found', { status: 404 });
  }
  // Generate a new verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  // Update subscriber with verification token
  const currentFields = (subscriber.customFields || {}) as CustomFields;
  await db.subscriber.update({
    where: { id: subscriber.id },
    data: {
      customFields: {
        ...currentFields,
        verificationToken,
      } as any,
    },
  });
  // Send verification email
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const verifyUrl = new URL('/api/verify-email', origin).toString();
    const verificationUrl = `${verifyUrl}?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    const emailData = {
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
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #374151;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .email-wrapper {
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
              letter-spacing: -0.025em;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 16px;
              opacity: 0.9;
            }
            .content {
              padding: 40px 30px;
            }
            .icon-container {
              text-align: center;
              margin-bottom: 30px;
            }
            .icon-bg {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 80px;
              height: 80px;
              background-color: #ede9fe;
              border-radius: 50%;
              margin-bottom: 20px;
            }
            .content h2 {
              color: #111827;
              font-size: 24px;
              font-weight: 700;
              margin: 0 0 20px 0;
              text-align: center;
            }
            .content p {
              color: #6b7280;
              font-size: 16px;
              margin: 0 0 20px 0;
              line-height: 1.7;
            }
            .cta-container {
              text-align: center;
              margin: 40px 0;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: black;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.3);
              transition: all 0.2s ease;
            }
            .cta-button:hover {
              transform: translateY(-1px);
              box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.4);
            }
            .alternative-section {
              background-color: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            .alternative-section p {
              margin: 0 0 10px 0;
              font-size: 14px;
              color: #6b7280;
            }
            .alternative-section .url {
              background-color: #ffffff;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              padding: 12px;
              font-family: 'Courier New', monospace;
              font-size: 12px;
              word-break: break-all;
              color: #374151;
              margin: 0;
            }
            .security-notice {
              background-color: #fef3c7;
              border: 1px solid #fcd34d;
              border-radius: 8px;
              padding: 16px;
              margin: 30px 0;
              display: flex;
              align-items: flex-start;
            }
            .security-notice-icon {
              flex-shrink: 0;
              margin-right: 12px;
              margin-top: 2px;
            }
            .security-notice p {
              margin: 0;
              font-size: 14px;
              color: #92400e;
            }
            .footer {
              background-color: #f9fafb;
              border-top: 1px solid #e5e7eb;
              padding: 30px;
              text-align: center;
            }
            .footer p {
              margin: 0 0 8px 0;
              font-size: 14px;
              color: #6b7280;
            }
            .footer .email-address {
              font-weight: 600;
              color: #374151;
            }
            @media only screen and (max-width: 600px) {
              .container { padding: 10px; }
              .content, .header, .footer { padding: 30px 20px; }
              .header h1 { font-size: 24px; }
              .content h2 { font-size: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <!-- Header -->
              <div class="header">
                <h1>WaitListNow</h1>
                <p>Email Verification Required</p>
              </div>
              
              <!-- Content -->
              <div class="content">
                <div class="icon-container">
                  <div class="icon-bg">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2>Verify Your Email Address</h2>
                </div>
                
                <p>Hello! 👋</p>
                <p>Thank you for joining our waitlist! To complete your registration and ensure you receive important updates, we need to verify your email address.</p>
                <p>Click the button below to verify your email and secure your spot:</p>
                
                <!-- CTA Button -->
                <div class="cta-container">
                  <a href="${verificationUrl}" class="cta-button">
                    ✉️ Verify Email Address
                  </a>
                </div>
                
                <!-- Alternative Link -->
                <div class="alternative-section">
                  <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                  <div class="url">${verificationUrl}</div>
                </div>
                
                <!-- Security Notice -->
                <div class="security-notice">
                  <div class="security-notice-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style="color: #f59e0b;">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p><strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. If you didn't request to join this waitlist, you can safely ignore this email.</p>
                  </div>
                </div>
                
                <p style="text-align: center; color: #9ca3af;">Need help? Contact us at support@waitlistnow.app</p>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} WaitListNow. All rights reserved.</p>
                <p>This email was sent to <span class="email-address">${email}</span></p>
                <p>If you didn't request this verification, you can safely ignore this email.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello!

Thank you for joining our waitlist! To complete your registration, please verify your email address by visiting this link:

${verificationUrl}

This verification link will expire in 24 hours for your security.

If you didn't request to join this waitlist, you can safely ignore this email.

Need help? Contact us at support@waitlistnow.app

© ${new Date().getFullYear()} WaitListNow. All rights reserved.
      `,
    };
    const response = await resend.emails.send(emailData);
    if (!response) {
      throw new Error('No response from Resend API');
    }
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
    });
  } catch (emailError: unknown) {
    console.error('Failed to send email:');
    console.error('Error name:', (emailError as Error)?.name);
    console.error('Error message:', (emailError as Error)?.message);
    console.error('Error stack:', (emailError as Error)?.stack);
    if ((emailError as ErrorWithResponse).response) {
      const resp = (emailError as ErrorWithResponse).response;
      if (resp) {
        console.error('Error response data:', await resp.text());
      }
    }
    return new NextResponse('Failed to send verification email', { status: 500 });
  }
}
