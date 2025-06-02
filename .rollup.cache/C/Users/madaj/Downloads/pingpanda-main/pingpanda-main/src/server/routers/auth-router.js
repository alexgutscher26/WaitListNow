import { __awaiter, __generator } from "tslib";
import { currentUser } from '@clerk/nextjs/server';
// HTTPException import removed as it's not used
import { router } from '../__internals/router';
import { publicProcedure } from '../procedures';
import { db } from '@/lib/db';
export var dynamic = 'force-dynamic';
export var authRouter = router({
    getDatabaseSyncStatus: publicProcedure.query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var auth, user;
        var c = _b.c;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, currentUser()];
                case 1:
                    auth = _c.sent();
                    if (!auth) {
                        return [2 /*return*/, c.json({ isSynced: false })];
                    }
                    return [4 /*yield*/, db.user.findFirst({
                            where: { externalId: auth.id },
                        })];
                case 2:
                    user = _c.sent();
                    if (!!user) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.user.create({
                            data: {
                                externalId: auth.id,
                                email: auth.emailAddresses[0].emailAddress,
                            },
                        })];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [2 /*return*/, c.json({ isSynced: true })];
            }
        });
    }); }),
});
// route.ts
//# sourceMappingURL=auth-router.js.map