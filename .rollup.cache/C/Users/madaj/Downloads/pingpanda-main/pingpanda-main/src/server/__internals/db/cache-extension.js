import { __awaiter, __generator, __rest } from "tslib";
import { Prisma } from '@prisma/client';
import { deserialize, stringify } from 'superjson';
function isSuperJSONResult(obj) {
    return typeof obj === 'object' && obj !== null && 'json' in obj && 'meta' in obj;
}
export var cacheExtension = function (_a) {
    var redis = _a.redis;
    return Prisma.defineExtension({
        name: 'prisma-extension-cache',
        model: {
            $allModels: {
                findFirst: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, cachedResult, result, serializedResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.get(cache.id)];
                                case 1:
                                    cachedResult = _a.sent();
                                    if (cachedResult && isSuperJSONResult(cachedResult)) {
                                        return [2 /*return*/, deserialize(cachedResult)];
                                    }
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].findFirst(rest)];
                                case 3:
                                    result = _a.sent();
                                    if (!(cache && result)) return [3 /*break*/, 7];
                                    serializedResult = stringify(result);
                                    if (!cache.ttl) return [3 /*break*/, 5];
                                    return [4 /*yield*/, redis.set(cache.id, serializedResult, { ex: cache.ttl })];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, redis.set(cache.id, serializedResult)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/, result];
                            }
                        });
                    });
                },
                findUnique: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, cachedResult, result, serializedResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.get(cache.id)];
                                case 1:
                                    cachedResult = _a.sent();
                                    if (cachedResult && isSuperJSONResult(cachedResult)) {
                                        return [2 /*return*/, deserialize(cachedResult)];
                                    }
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].findUnique(rest)];
                                case 3:
                                    result = _a.sent();
                                    if (!(cache && result)) return [3 /*break*/, 7];
                                    serializedResult = stringify(result);
                                    if (!cache.ttl) return [3 /*break*/, 5];
                                    return [4 /*yield*/, redis.set(cache.id, serializedResult, { ex: cache.ttl })];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, redis.set(cache.id, serializedResult)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/, result];
                            }
                        });
                    });
                },
                findMany: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, cachedResult, result, serializedResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.get(cache.id)];
                                case 1:
                                    cachedResult = _a.sent();
                                    if (cachedResult && isSuperJSONResult(cachedResult)) {
                                        return [2 /*return*/, deserialize(cachedResult)];
                                    }
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].findMany(rest)];
                                case 3:
                                    result = _a.sent();
                                    if (!(cache && result)) return [3 /*break*/, 7];
                                    serializedResult = stringify(result);
                                    if (!cache.ttl) return [3 /*break*/, 5];
                                    return [4 /*yield*/, redis.set(cache.id, serializedResult, { ex: cache.ttl })];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, redis.set(cache.id, serializedResult)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/, result];
                            }
                        });
                    });
                },
                create: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.del(cache.id)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].create(rest)];
                                case 3:
                                    result = _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                },
                update: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.del(cache.id)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].update(rest)];
                                case 3:
                                    result = _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                },
                delete: function (args) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _cache, rest, cache, ctx, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _cache = args.cache, rest = __rest(args, ["cache"]);
                                    cache = _cache;
                                    ctx = Prisma.getExtensionContext(this);
                                    if (!cache) return [3 /*break*/, 2];
                                    return [4 /*yield*/, redis.del(cache.id)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ctx.$parent[ctx.$name].delete(rest)];
                                case 3:
                                    result = _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                },
            },
        },
    });
};
//# sourceMappingURL=cache-extension.js.map