import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { hc } from 'hono/client';
import { HTTPException } from 'hono/http-exception';
import { parse, stringify } from 'superjson';
/**
 * Determines the base URL based on the environment and deployment context.
 *
 * This function first checks if it is running in a browser environment by verifying
 * the presence of the `window` object. If true, it returns an empty string for
 * relative paths. Otherwise, it determines the base URL based on the Node.js
 * environment:
 * - In development mode, it uses 'http://localhost:3000/'.
 * - In production, it checks for the VERCEL_URL environment variable and constructs
 *   the URL accordingly. If VERCEL_URL is not set, it defaults to a placeholder
 *   deployed worker URL.
 */
var getBaseUrl = function () {
    // browser should use relative path
    if (typeof window !== 'undefined') {
        return '';
    }
    return process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'
        : process.env.VERCEL_URL
            ? "https://".concat(process.env.VERCEL_URL)
            : 'https://<YOUR_DEPLOYED_WORKER_URL>/';
};
export var baseClient = hc(getBaseUrl(), {
    fetch: function (input, init) { return __awaiter(void 0, void 0, void 0, function () {
        var response, contentType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(input, __assign(__assign({}, init), { cache: 'no-store' }))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new HTTPException(response.status, {
                            message: response.statusText,
                            res: response,
                        });
                    }
                    contentType = response.headers.get('Content-Type');
                    response.json = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var text;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, response.text()];
                                case 1:
                                    text = _a.sent();
                                    if (contentType === 'application/superjson') {
                                        return [2 /*return*/, parse(text)];
                                    }
                                    try {
                                        return [2 /*return*/, JSON.parse(text)];
                                    }
                                    catch (error) {
                                        console.error('Failed to parse response as JSON:', error);
                                        throw new Error('Invalid JSON response');
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [2 /*return*/, response];
            }
        });
    }); },
})['api'];
/**
 * Retrieves a nested function from an object using a series of keys.
 *
 * Iterates through each key, checking for the existence of the property on the current object and ensuring it does not lead to prototype pollution.
 * Throws errors if any validation fails at any step.
 *
 * @param obj - The initial object from which to start retrieving nested properties.
 * @param keys - A rest parameter representing the series of keys to navigate through the object.
 * @returns The function located at the specified path within the object.
 * @throws Error If the initial object is invalid, a key does not exist, or the final value is not a function.
 */
function getHandler(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var current = obj;
    // Check if the object is safe to work with
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('Invalid object provided to getHandler');
    }
    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
        var key = keys_1[_a];
        // Prevent prototype pollution by checking if the key exists on the object itself
        // and not on its prototype chain
        if (!Object.prototype.hasOwnProperty.call(current, key)) {
            throw new Error("Property '".concat(key, "' does not exist on the target object"));
        }
        var value = current[key];
        // Ensure we don't allow access to prototype methods
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            throw new Error("Access to '".concat(key, "' is not allowed"));
        }
        current = value;
        // If we hit a non-object before processing all keys, it's an invalid path
        if (current === null || typeof current !== 'object') {
            throw new Error('Invalid path: not an object');
        }
    }
    if (typeof current !== 'function') {
        throw new Error('The specified path does not point to a function');
    }
    return current;
}
/**
 * Serializes an object using SuperJSON for its values.
 */
function serializeWithSuperJSON(data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }
    if (data === null || typeof data !== 'object') {
        return data;
    }
    return Object.fromEntries(Object.entries(data).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [key, stringify(value)];
    }));
}
/**
 * Creates a proxy to facilitate API requests with convenience methods.
 *
 * This function wraps an object and provides `$get` and `$post` methods
 * for making API calls. It uses recursion to handle nested objects,
 * constructing the request path dynamically based on property access.
 *
 * @param target - The target object to be proxied.
 * @param path - An optional array representing the current path in the object hierarchy.
 */
function createProxy(target, path) {
    if (path === void 0) { path = []; }
    return new Proxy(target, {
        get: function (target, prop, receiver) {
            var _this = this;
            if (typeof prop === 'string') {
                var newPath_1 = __spreadArray(__spreadArray([], path, true), [prop], false);
                if (prop === '$get') {
                    return function (args) { return __awaiter(_this, void 0, void 0, function () {
                        var executor, serializedQuery;
                        return __generator(this, function (_a) {
                            executor = getHandler.apply(void 0, __spreadArray([baseClient], newPath_1, false));
                            serializedQuery = serializeWithSuperJSON(args);
                            return [2 /*return*/, executor({ query: serializedQuery })];
                        });
                    }); };
                }
                if (prop === '$post') {
                    return function (args) { return __awaiter(_this, void 0, void 0, function () {
                        var executor, serializedJson;
                        return __generator(this, function (_a) {
                            executor = getHandler.apply(void 0, __spreadArray([baseClient], newPath_1, false));
                            serializedJson = serializeWithSuperJSON(args);
                            return [2 /*return*/, executor({ json: serializedJson })];
                        });
                    }); };
                }
                // Safe property access with type assertion
                var value = target[prop];
                if (value && typeof value === 'object') {
                    return createProxy(value, newPath_1);
                }
                return value;
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
export var client = createProxy(baseClient);
//# sourceMappingURL=client.js.map