import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

/**
 * Mapping of plan names to Stripe price IDs 
 */
// TODO: add price ids for each plan
export const PLAN_PRICE_IDS: Record<string, string> = {
  PRO: 'price_PRO_PLACEHOLDER',
  STARTER: 'price_STARTER_PLACEHOLDER',
  GROWTH: 'price_GROWTH_PLACEHOLDER',
  // Add more plans as needed
};

/**
 * Creates a Stripe checkout session for payment with specified user details and plan.
 */
export const createCheckoutSession = async ({
  userEmail,
  userId,
  plan,
}: {
  userEmail: string;
  userId: string;
  plan: keyof typeof PLAN_PRICE_IDS;
}) => {
  const priceId = PLAN_PRICE_IDS[plan];
  if (!priceId) {
    throw new Error(`Invalid plan: ${plan}`);
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
      plan,
    },
  });

  return session;
};
