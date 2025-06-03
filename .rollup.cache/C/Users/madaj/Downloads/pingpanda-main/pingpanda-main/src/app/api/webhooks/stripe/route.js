import { __awaiter, __generator } from "tslib";
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
/**
 * Handles incoming POST requests from Stripe webhooks.
 *
 * This function processes the incoming request, verifies the event signature,
 * and updates user plans based on completed checkout sessions. It checks for valid metadata
 * and performs database operations accordingly.
 *
 * @param req - The HTTP request object containing the webhook payload.
 * @returns A Response object indicating success or failure.
 */
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, signature, event, session, userId;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.text()];
                case 1:
                    body = _b.sent();
                    signature = headers().get('stripe-signature');
                    event = stripe.webhooks.constructEvent(body, signature !== null && signature !== void 0 ? signature : '', (_a = process.env.STRIPE_WEBHOOK_SECRET) !== null && _a !== void 0 ? _a : '');
                    if (!(event.type === 'checkout.session.completed')) return [3 /*break*/, 3];
                    session = event.data.object;
                    userId = (session.metadata || { userId: null }).userId;
                    if (!userId) {
                        return [2 /*return*/, new Response('Invalid metadata', { status: 400 })];
                    }
                    return [4 /*yield*/, db.user.update({
                            where: { id: userId },
                            data: { plan: 'PRO' },
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/, new Response('OK')];
            }
        });
    });
}
//# sourceMappingURL=route.js.map