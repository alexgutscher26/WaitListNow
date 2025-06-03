import { LRUCache } from 'lru-cache';
/**
 * Creates a rate limiting function using an LRU cache to track token usage.
 */
export function rateLimit(options) {
    var tokenCache = new LRUCache({
        max: options.uniqueTokenPerInterval || 500,
        ttl: options.interval,
    });
    return {
        check: function (limit, token) {
            return new Promise(function (resolve) {
                var tokenCount = tokenCache.get(token) || [0];
                if (tokenCount[0] === 0) {
                    tokenCache.set(token, tokenCount);
                }
                tokenCount[0] += 1;
                var currentUsage = tokenCount[0];
                var isRateLimited = currentUsage > limit;
                return resolve({
                    success: !isRateLimited,
                });
            });
        },
    };
}
//# sourceMappingURL=rate-limit.js.map