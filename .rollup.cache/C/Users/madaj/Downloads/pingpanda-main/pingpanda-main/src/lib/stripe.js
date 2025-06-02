var _a;
import { __awaiter, __generator } from "tslib";
import Stripe from 'stripe';
export var stripe = new Stripe((_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : '', {
    apiVersion: '2025-05-28.basil',
    typescript: true,
});
/**
 * Creates a Stripe checkout session for payment with specified user details.
 */
export var createCheckoutSession = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var session;
    var userEmail = _b.userEmail, userId = _b.userId;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, stripe.checkout.sessions.create({
                    // TODO: change price and add more plans
                    line_items: [
                        {
                            price: 'price_1QBHVBA19umTXGu8gzhUCSG7',
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: "".concat(process.env.NEXT_PUBLIC_APP_URL, "/dashboard?success=true"),
                    cancel_url: "".concat(process.env.NEXT_PUBLIC_APP_URL, "/pricing"),
                    customer_email: userEmail,
                    metadata: {
                        userId: userId,
                    },
                })];
            case 1:
                session = _c.sent();
                return [2 /*return*/, session];
        }
    });
}); };
//# sourceMappingURL=stripe.js.map