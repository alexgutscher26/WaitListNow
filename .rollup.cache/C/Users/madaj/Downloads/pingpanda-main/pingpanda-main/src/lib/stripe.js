var _a;
import { __awaiter, __generator } from 'tslib';
import Stripe from 'stripe';
export var stripe = new Stripe(
  (_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : '',
  {
    apiVersion: '2025-05-28.basil',
    typescript: true,
  },
);
/**
 * Mapping of plan names to Stripe price IDs
 */
// TODO: add price ids for each plan
export var PLAN_PRICE_IDS = {
  PRO: 'price_PRO_PLACEHOLDER',
  STARTER: 'price_STARTER_PLACEHOLDER',
  GROWTH: 'price_GROWTH_PLACEHOLDER',
  // Add more plans as needed
};
/**
 * Creates a Stripe checkout session for payment with specified user details and plan.
 */
export var createCheckoutSession = function (_a) {
  return __awaiter(void 0, [_a], void 0, function (_b) {
    var priceId, session;
    var userEmail = _b.userEmail,
      userId = _b.userId,
      plan = _b.plan;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          priceId = PLAN_PRICE_IDS[plan];
          if (!priceId) {
            throw new Error('Invalid plan: '.concat(plan));
          }
          return [
            4 /*yield*/,
            stripe.checkout.sessions.create({
              line_items: [
                {
                  price: priceId,
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: ''.concat(process.env.NEXT_PUBLIC_APP_URL, '/dashboard?success=true'),
              cancel_url: ''.concat(process.env.NEXT_PUBLIC_APP_URL, '/pricing'),
              customer_email: userEmail,
              metadata: {
                userId: userId,
                plan: plan,
              },
            }),
          ];
        case 1:
          session = _c.sent();
          return [2 /*return*/, session];
      }
    });
  });
};
//# sourceMappingURL=stripe.js.map
