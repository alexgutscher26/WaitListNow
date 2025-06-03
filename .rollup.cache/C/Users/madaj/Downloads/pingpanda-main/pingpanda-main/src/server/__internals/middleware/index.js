/**
 * Internal middlewares
 * Do not modify unless you know what you're doing
 */
import { __awaiter, __generator } from "tslib";
import { parseSuperJSON } from './utils';
/**
 * Parses query parameters of a GET request and attaches them to the context.
 */
export var queryParsingMiddleware = function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rawQuery, parsedQuery, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                rawQuery = c.req.query();
                parsedQuery = {};
                for (_i = 0, _a = Object.entries(rawQuery); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    parsedQuery[key] = parseSuperJSON(value);
                }
                c.set('parsedQuery', parsedQuery);
                return [4 /*yield*/, next()];
            case 1:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Middleware to parse POST requests using SuperJSON and store the result in the context.
 *
 * This function reads the raw JSON body from the request, parses each value using `parseSuperJSON`,
 * and stores the parsed body in the context under the key 'parsedBody'. It then proceeds to the next middleware or handler.
 */
export var bodyParsingMiddleware = function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rawBody, parsedBody, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                rawBody = _c.sent();
                parsedBody = {};
                for (_i = 0, _a = Object.entries(rawBody); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    parsedBody[key] = parseSuperJSON(value);
                }
                c.set('parsedBody', parsedBody);
                return [4 /*yield*/, next()];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=index.js.map