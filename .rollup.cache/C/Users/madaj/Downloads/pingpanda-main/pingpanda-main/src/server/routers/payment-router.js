import { __awaiter, __generator } from "tslib";
import { createCheckoutSession } from '@/lib/stripe';
import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';
export var paymentRouter = router({
    createCheckoutSession: privateProcedure.mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user, session;
        var c = _b.c, ctx = _b.ctx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = ctx.user;
                    return [4 /*yield*/, createCheckoutSession({
                            userEmail: user.email,
                            userId: user.id,
                        })];
                case 1:
                    session = _c.sent();
                    return [2 /*return*/, c.json({ url: session.url })];
            }
        });
    }); }),
    getUserPlan: privateProcedure.query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user;
        var c = _b.c, ctx = _b.ctx;
        return __generator(this, function (_c) {
            user = ctx.user;
            return [2 /*return*/, c.json({ plan: user.plan })];
        });
    }); }),
});
//# sourceMappingURL=payment-router.js.map