import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval: number;
};

/**
 * Creates a rate limiting function using an LRU cache to track token usage.
 */
export function rateLimit(options: Options) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<{ success: boolean }>((resolve) => {
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;

        return resolve({
          success: !isRateLimited,
        });
      }),
  };
}
