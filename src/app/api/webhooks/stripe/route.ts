import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

/**
 * Handles incoming POST requests from Stripe webhooks.
 *
 * This function processes the incoming request, verifies the event signature,
 * and updates user plans based on completed checkout sessions.
 *
 * @param req - The HTTP request object containing the webhook payload.
 * @returns A Response object indicating success or failure.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? '',
    process.env.STRIPE_WEBHOOK_SECRET ?? '',
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const { userId } = session.metadata || { userId: null };

    if (!userId) {
      return new Response('Invalid metadata', { status: 400 });
    }

    await db.user.update({
      where: { id: userId },
      data: { plan: 'PRO' },
    });
  }

  return new Response('OK');
}
