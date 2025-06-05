import { z } from 'zod';
import { createCheckoutSession } from '@/lib/stripe';
import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// Input and output types
const createCheckoutSessionInput = z.object({
  plan: z.enum(['PRO', 'STARTER', 'GROWTH']),
});

export const paymentRouter = router<{
  createCheckoutSession: import('../__internals/types').MutationOperation<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  getUserPlan: import('../__internals/types').QueryOperation<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}>({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx, input }) => {
    // Validate input using zod
    const parsed = createCheckoutSessionInput.parse(input);
    const { user } = ctx;
    const { plan } = parsed;
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
      plan,
    });
    return c.superjson({ url: session.url } as Record<string, unknown>);
  }),

  getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx;
    return c.superjson({ plan: user.plan } as Record<string, unknown>);
  }),
});
