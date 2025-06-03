import { __awaiter, __generator } from "tslib";
import { db } from '@/lib/db';
import { j } from './__internals/j';
import { currentUser } from '@clerk/nextjs/server';
import { HTTPException } from 'hono/http-exception';
var authMiddleware = j.middleware(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var authHeader, apiKey, user_1, auth, user;
    var c = _b.c, next = _b.next;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                authHeader = c.req.header('Authorization');
                if (!authHeader) return [3 /*break*/, 2];
                apiKey = authHeader.split(' ')[1];
                return [4 /*yield*/, db.user.findUnique({
                        where: { apiKey: apiKey },
                    })];
            case 1:
                user_1 = _c.sent();
                if (user_1)
                    return [2 /*return*/, next({ user: user_1 })];
                _c.label = 2;
            case 2: return [4 /*yield*/, currentUser()];
            case 3:
                auth = _c.sent();
                if (!auth) {
                    throw new HTTPException(401, { message: 'Unauthorized' });
                }
                return [4 /*yield*/, db.user.findUnique({
                        where: { externalId: auth.id },
                    })];
            case 4:
                user = _c.sent();
                if (!user) {
                    throw new HTTPException(401, { message: 'Unauthorized' });
                }
                return [2 /*return*/, next({ user: user })];
        }
    });
}); });
/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export var baseProcedure = j.procedure;
export var publicProcedure = baseProcedure;
export var privateProcedure = publicProcedure.use(authMiddleware);
//# sourceMappingURL=procedures.js.map