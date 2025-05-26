import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-09-30.acacia',
  typescript: true,
});

/**
 * Creates a Stripe checkout session for payment with specified user details.
 */
export const createCheckoutSession = async ({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    // TODO: change price and add more plans
    line_items: [
      {
        price: 'price_1QBHVBA19umTXGu8gzhUCSG7',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  });

  return session;
};
