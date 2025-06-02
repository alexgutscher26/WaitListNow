import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { bodyParsingMiddleware, queryParsingMiddleware } from './middleware';
/**
 * Create a Hono router with specified operations and middleware.
 *
 * This function iterates over an object of operations, defining routes for each operation type (query or mutation).
 * It applies middlewares to each route and handles request parsing using Zod schemas if provided.
 * The function also sets up error handling for HTTP exceptions and unknown errors.
 *
 * @param obj - An object where keys are route identifiers and values are operation configurations.
 * @returns A configured Hono router instance with defined routes and middleware.
 */
export var router = function (obj) {
    var route = new Hono().onError(function (err, c) {
        if (err instanceof HTTPException) {
            return c.json({
                error: 'Server Error',
                message: err.message,
                type: 'HTTPException',
            }, err.status);
        }
        else {
            return c.json({
                error: 'Unknown Error',
                message: 'An unexpected error occurred',
                type: 'UnknownError',
            }, 500);
        }
    });
    Object.entries(obj).forEach(function (_a) {
        var key = _a[0], operation = _a[1];
        var path = "/".concat(key);
        var operationMiddlewares = operation.middlewares.map(function (middleware) {
            /**
             * Wraps middleware execution and updates context with results.
             */
            var wrapperFunction = function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
                var ctx, nextWrapper, res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            ctx = (_a = c.get('__middleware_output')) !== null && _a !== void 0 ? _a : {};
                            nextWrapper = function (args) {
                                c.set('__middleware_output', __assign(__assign({}, ctx), args));
                                return __assign(__assign({}, ctx), args);
                            };
                            return [4 /*yield*/, middleware({ ctx: ctx, next: nextWrapper, c: c })];
                        case 1:
                            res = _b.sent();
                            c.set('__middleware_output', __assign(__assign({}, ctx), res));
                            return [4 /*yield*/, next()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            return wrapperFunction;
        });
        if (operation.type === 'query') {
            if (operation.schema) {
                route.get.apply(route, __spreadArray(__spreadArray([path, queryParsingMiddleware], operationMiddlewares, false), [function (c) {
                        var _a;
                        var ctx = c.get('__middleware_output') || {};
                        var parsedQuery = c.get('parsedQuery');
                        var input;
                        try {
                            input = (_a = operation.schema) === null || _a === void 0 ? void 0 : _a.parse(parsedQuery);
                        }
                        catch (err) {
                            if (err instanceof ZodError) {
                                throw new HTTPException(400, {
                                    cause: err,
                                    message: err.message,
                                });
                            }
                            else {
                                throw err;
                            }
                        }
                        return operation.handler({ c: c, ctx: ctx, input: input });
                    }], false));
            }
            else {
                route.get.apply(route, __spreadArray(__spreadArray([path], operationMiddlewares, false), [function (c) {
                        var ctx = c.get('__middleware_output') || {};
                        return operation.handler({ c: c, ctx: ctx, input: undefined });
                    }], false));
            }
        }
        else if (operation.type === 'mutation') {
            if (operation.schema) {
                route.post.apply(route, __spreadArray(__spreadArray([path, bodyParsingMiddleware], operationMiddlewares, false), [function (c) {
                        var _a;
                        var ctx = c.get('__middleware_output') || {};
                        var parsedBody = c.get('parsedBody');
                        var input;
                        try {
                            input = (_a = operation.schema) === null || _a === void 0 ? void 0 : _a.parse(parsedBody);
                        }
                        catch (err) {
                            if (err instanceof ZodError) {
                                throw new HTTPException(400, {
                                    cause: err,
                                    message: err.message,
                                });
                            }
                            else {
                                throw err;
                            }
                        }
                        return operation.handler({ c: c, ctx: ctx, input: input });
                    }], false));
            }
            else {
                route.post.apply(route, __spreadArray(__spreadArray([path], operationMiddlewares, false), [function (c) {
                        var ctx = c.get('__middleware_output') || {};
                        return operation.handler({ c: c, ctx: ctx, input: undefined });
                    }], false));
            }
        }
    });
    return route;
};
//# sourceMappingURL=router.js.map