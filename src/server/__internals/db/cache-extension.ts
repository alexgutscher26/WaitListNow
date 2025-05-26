import { Prisma } from '@prisma/client';
import { Redis } from '@upstash/redis/cloudflare';
import superjson, { SuperJSONResult } from 'superjson';

export type CacheArgs = { cache?: { id: string; ttl?: number } };

/**
 * Checks if the given object is a valid SuperJSONResult.
 *
 * This function evaluates whether the input `obj` is an object, not null,
 * and contains both 'json' and 'meta' properties. It returns true if all
 * conditions are satisfied, otherwise false.
 *
 * @param obj - The object to be validated.
 */
function isSuperJSONResult(obj: any): obj is SuperJSONResult {
  return typeof obj === 'object' && obj !== null && 'json' in obj && 'meta' in obj;
}

/**
 * Prisma extension to provide built-in caching with Upstash Redis.
 *
 * This extension enhances Prisma client methods by adding caching functionality using Redis.
 * It intercepts `findFirst`, `findUnique`, `findMany`, `create`, `update`, and `delete` operations.
 * For read operations (`findFirst`, `findUnique`, `findMany`), it checks for cached results before hitting the database.
 * If a cache is specified in the arguments and the result is found, it deserializes and returns the cached result.
 * For write operations (`create`, `update`, `delete`), it invalidates the relevant cache entries by deleting them from Redis.
 *
 * @param redis - An instance of Redis to be used for caching.
 * @returns A Prisma extension with caching capabilities.
 */
export const cacheExtension = ({ redis }: { redis: Redis }) => {
  return Prisma.defineExtension({
    name: 'prisma-extension-cache',
    model: {
      $allModels: {
        async findFirst<T, A>(
          this: T,
          args: Prisma.Args<T, 'findFirst'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'findFirst'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            const cachedResult = await redis.get<string>(cache.id);

            if (cachedResult && isSuperJSONResult(cachedResult)) {
              return superjson.deserialize<Prisma.Result<T, A, 'findFirst'>>(cachedResult);
            }
          }

          const result = await (ctx as any).$parent[ctx.$name as any].findFirst(rest);

          if (cache && result) {
            const serializedResult = superjson.stringify(result);

            if (cache.ttl) {
              await redis.set(cache.id, serializedResult, { ex: cache.ttl });
            } else {
              await redis.set(cache.id, serializedResult);
            }
          }

          return result;
        },
        async findUnique<T, A>(
          this: T,
          args: Prisma.Args<T, 'findUnique'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'findUnique'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            const cachedResult = await redis.get<string>(cache.id);

            if (cachedResult && isSuperJSONResult(cachedResult)) {
              return superjson.deserialize<Prisma.Result<T, A, 'findUnique'>>(cachedResult);
            }
          }

          const result = await (ctx as any).$parent[ctx.$name as any].findUnique(rest);

          if (cache && result) {
            const serializedResult = superjson.stringify(result);

            if (cache.ttl) {
              await redis.set(cache.id, serializedResult, { ex: cache.ttl });
            } else {
              await redis.set(cache.id, serializedResult);
            }
          }

          return result;
        },
        async findMany<T, A>(
          this: T,
          args: Prisma.Args<T, 'findMany'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'findMany'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            const cachedResult = await redis.get<string>(cache.id);

            if (cachedResult && isSuperJSONResult(cachedResult)) {
              return superjson.deserialize<Prisma.Result<T, A, 'findMany'>>(cachedResult);
            }
          }

          const result = await (ctx as any).$parent[ctx.$name as any].findMany(rest);

          if (cache && result) {
            const serializedResult = superjson.stringify(result);

            if (cache.ttl) {
              await redis.set(cache.id, serializedResult, { ex: cache.ttl });
            } else {
              await redis.set(cache.id, serializedResult);
            }
          }

          return result;
        },
        async create<T, A>(
          this: T,
          args: Prisma.Args<T, 'create'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'create'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            await redis.del(cache.id);
          }

          const result = await (ctx as any).$parent[ctx.$name as any].create(rest);

          return result;
        },
        async update<T, A>(
          this: T,
          args: Prisma.Args<T, 'update'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'update'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            await redis.del(cache.id);
          }

          const result = await (ctx as any).$parent[ctx.$name as any].update(rest);

          return result;
        },
        async delete<T, A>(
          this: T,
          args: Prisma.Args<T, 'delete'> & CacheArgs,
        ): Promise<Prisma.Result<T, A, 'delete'>> {
          const { cache: _cache, ...rest } = args;
          const cache = _cache as CacheArgs['cache'];
          const ctx = Prisma.getExtensionContext(this);

          if (cache) {
            await redis.del(cache.id);
          }

          const result = await (ctx as any).$parent[ctx.$name as any].delete(rest);

          return result;
        },
      },
    },
  });
};
