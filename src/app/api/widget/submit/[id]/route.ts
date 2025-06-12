import isDisposableEmail from 'is-disposable-email';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { getRewardUnlockedEmail } from '@/emails';
import { db } from '@/lib/db';
import { validateEmailWithZeroBounce } from '@/lib/validations/emailValidation';

// Define validation schema
const submissionSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  fields: z.record(z.any()).optional(),
  referralCode: z.string().optional(),
  hp_token: z.string().optional(), // Honeypot field
  formRenderedAt: z.string().optional(), // Timestamp for intelligent CAPTCHA
});

/**
 * Handles POST requests to join a waitlist.
 *
 * This function processes incoming requests to join a waitlist, performing various checks and actions including:
 * 1. Handling CORS preflight requests.
 * 2. Retrieving the waitlist details based on the provided ID.
 * 3. Parsing and validating the request body against a schema.
 * 4. Checking for disposable email addresses.
 * 5. Verifying if the user is already subscribed to the waitlist.
 * 6. Creating a new subscriber entry in the database.
 * 7. Updating referral counts and sending emails for new reward tiers reached by referrers.
 * 8. Generating and sending verification emails if required by the waitlist settings.
 *
 * @param request - The incoming HTTP request object.
 * @param params - An object containing route parameters, specifically the waitlist ID.
 * @returns A JSON response indicating success or failure of the operation.
 * @throws Error If an internal server error occurs during processing.
 */
export async function POST(request: Request, { params }: { params: { id: string } }) {
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
        userId: true,
      },
    });

    if (!waitlist) {
      return NextResponse.json({ error: 'Waitlist not found' }, { status: 404 });
    }

    // Parse settings and get email verification flag
    const settings =
      typeof waitlist.settings === 'string'
        ? JSON.parse(waitlist.settings)
        : waitlist.settings || {};
    const requireEmailVerification = settings.emailVerification === true;

    // Parse and validate request body
    const body = await request.json();
    const validation = submissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: validation.error.issues },
        { status: 400 },
      );
    }

    const { email, name, fields, referralCode, hp_token, formRenderedAt } = validation.data;

    // Honeypot bot detection
    if (hp_token && hp_token.trim() !== '') {
      return NextResponse.json(
        { error: 'Bot-like signup detected.' },
        { status: 400 },
      );
    }

    // Intelligent CAPTCHA: time-based check
    if (!formRenderedAt) {
      return NextResponse.json(
        { error: 'Missing form timestamp.' },
        { status: 400 },
      );
    }
    const renderTime = Number(formRenderedAt);
    const now = Date.now();
    if (isNaN(renderTime) || now - renderTime < 2000) {
      return NextResponse.json(
        { error: 'Form submitted too quickly. Please try again.' },
        { status: 400 },
      );
    }

    // Disposable email detection
    if (isDisposableEmail(email)) {
      return NextResponse.json(
        { error: 'Disposable email addresses are not allowed.' },
        { status: 400 },
      );
    }

    // AI-powered email and domain validation (ZeroBounce)
    const zbResult = await validateEmailWithZeroBounce(email);
    if (zbResult.status !== 'valid') {
      return NextResponse.json(
        { error: `Email rejected: ${zbResult.status}${zbResult.sub_status ? ' (' + zbResult.sub_status + ')' : ''}${zbResult.reason ? ' - ' + zbResult.reason : ''}` },
        { status: 400 },
      );
    }

    // Check for existing subscriber
    const existingSubscriber = await db.subscriber.findFirst({
      where: {
        email,
        waitlistId: waitlist.id,
      },
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: 'You are already on the waitlist!' }, { status: 400 });
    }

    // Create subscriber
    const newReferralCode = uuidv4().split('-')[0];
    const subscriber = await db.subscriber.create({
      data: {
        id: uuidv4(),
        email,
        name: name || null,
        waitlistId: waitlist.id,
        userId: waitlist.userId,
        customFields: fields || {},
        referralCode: newReferralCode,
        referredBy: referralCode || null,
        status: requireEmailVerification ? 'PENDING' : 'VERIFIED',
      },
    });

    // Increment referralCount for the referrer if referralCode is present
    if (referralCode) {
      // Update referral count
      const referrerUsers = await db.user.findMany({ where: { referralCode } });
      await db.user.updateMany({
        where: { referralCode },
        data: { referralCount: { increment: 1 } },
      });
      // Check if a new reward tier is reached and send email
      if (referrerUsers.length > 0) {
        const referrer = referrerUsers[0];
        // Get new referral count
        const updatedReferrer = await db.user.findUnique({ where: { id: referrer.id } });
        if (updatedReferrer) {
          // Define reward tiers (should match your main logic)
          const REWARD_TIERS = [
            { count: 1, name: 'Early Supporter', reward: 'Priority access, exclusive badge' },
            {
              count: 3,
              name: 'Rising Referrer',
              reward: 'Access to behind-the-scenes updates or beta features',
            },
            {
              count: 5,
              name: 'Inner Circle',
              reward: 'Free 1-month trial / Pro plan / "Founding Member" badge',
            },
            {
              count: 10,
              name: 'Power Promoter',
              reward: 'Discounted subscription (e.g., 50% off for 3 months)',
            },
            {
              count: 25,
              name: 'Brand Ambassador',
              reward: 'Swag pack (stickers, T-shirt) or lifetime deal contest entry',
            },
            {
              count: 50,
              name: 'Growth Hacker',
              reward: 'Lifetime plan or a custom domain subdomain (like yourname.waitlistnow.app)',
            },
            {
              count: 100,
              name: 'Legend Tier',
              reward: 'Public shoutout, profile feature, big reward like AirPods, etc.',
            },
          ];
          const prevCount = referrer.referralCount || 0;
          const newCount = updatedReferrer.referralCount || 0;
          // Find if a new tier is reached
          const unlockedTier = REWARD_TIERS.find(
            (tier) => prevCount < tier.count && newCount >= tier.count,
          );
          if (unlockedTier && referrer.email) {
            try {
              const { html, text } = getRewardUnlockedEmail({
                name: referrer.name || undefined,
                waitlistName: undefined, // Optionally fetch waitlist name if needed
                rewardName: unlockedTier.name,
                message: `You've unlocked the "${unlockedTier.name}" reward: ${unlockedTier.reward}`,
              });
              const resend = new Resend(process.env.RESEND_API_KEY);
              await resend.emails.send({
                from: 'WaitListNow <noreply@waitlistnow.app>',
                to: referrer.email,
                subject: `You've unlocked a new reward: ${unlockedTier.name}!`,
                html,
                text,
              });
            } catch (error) {
              console.error('Error sending reward email:', error);
            }
          }
        }
      }
    }

    return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request.' },
      { status: 500 },
    );
  }
}