import { __awaiter, __generator, __spreadArray } from "tslib";
import superjson from 'superjson';
var Procedure = /** @class */ (function () {
    function Procedure(middlewares) {
        if (middlewares === void 0) { middlewares = []; }
        var _this = this;
        this.middlewares = [];
        this.input = function (schema) { return ({
            query: function (fn) { return ({
                type: 'query',
                schema: schema,
                handler: fn,
                middlewares: _this.middlewares,
            }); },
            mutation: function (fn) { return ({
                type: 'mutation',
                schema: schema,
                handler: fn,
                middlewares: _this.middlewares,
            }); },
        }); };
        this.middlewares = middlewares;
        // add built-in superjson middleware if not already present
        if (!this.middlewares.some(function (mw) { return mw.name === 'superjsonMiddleware'; })) {
            this.middlewares.push(Procedure.superjsonMiddleware);
        }
    }
    /**
     * Optional, but recommended:
     * This makes "c.superjson" available to your API routes
     */
    Procedure.superjsonMiddleware = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var c = _b.c, next = _b.next;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        c.superjson = (function (data, status) {
                            var serialized = superjson.stringify(data);
                            return new Response(serialized, {
                                status: status || 200,
                                headers: { 'Content-Type': 'application/superjson' },
                            });
                        });
                        return [4 /*yield*/, next()];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Adds a middleware function to the procedure chain and returns a new procedure with updated context.
     */
    Procedure.prototype.use = function (fn) {
        return new Procedure(__spreadArray(__spreadArray([], this.middlewares, true), [fn], false));
    };
    /**
     * Registers a query operation with the specified function and returns it.
     */
    Procedure.prototype.query = function (fn) {
        return {
            type: 'query',
            handler: fn,
            middlewares: this.middlewares,
        };
    };
    /**
     * Registers a mutation operation with specified handler and middleware.
     */
    Procedure.prototype.mutation = function (fn) {
        return {
            type: 'mutation',
            handler: fn,
            middlewares: this.middlewares,
        };
    };
    return Procedure;
}());
export { Procedure };
//# sourceMappingURL=procedure.js.map