import { Prisma } from '@prisma/client';
import { Redis } from '@upstash/redis/cloudflare';
import { deserialize, stringify, SuperJSONResult } from 'superjson';

type PrismaModel = {
  findFirst: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

export type CacheArgs = { cache?: { id: string; ttl?: number } };

/**
 * Checks if an object is a valid SuperJSONResult instance.
 *
 * This function verifies that the input is an object, not null,
 * and contains both 'json' and 'meta' properties.
 */
function isSuperJSONResult(obj: unknown): obj is SuperJSONResult {
  return typeof obj === 'object' && obj !== null && 'json' in obj && 'meta' in obj;
}

/**
 * Defines a Prisma extension to cache database queries using Redis.
 *
 * This function extends Prisma models with caching capabilities for `findFirst`, `findUnique`, and `findMany` methods. It also handles cache invalidation for `create`, `update`, and `delete` operations. The caching logic checks if the result is already cached in Redis, retrieves it if available, or fetches from the database and caches the result.
 *
 * @param {object} options - An object containing the Redis client instance.
 * @param {Redis} options.redis - The Redis client used for caching.
 * @returns A Prisma extension with cache capabilities.
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
              return deserialize<Prisma.Result<T, A, 'findFirst'>>(cachedResult);
            }
          }

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].findFirst(rest) as Prisma.Result<T, A, 'findFirst'>;

          if (cache && result) {
            const serializedResult = stringify(result);

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
              return deserialize<Prisma.Result<T, A, 'findUnique'>>(cachedResult);
            }
          }

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].findUnique(rest) as Prisma.Result<T, A, 'findUnique'>;

          if (cache && result) {
            const serializedResult = stringify(result);

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
              return deserialize<Prisma.Result<T, A, 'findMany'>>(cachedResult);
            }
          }

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].findMany(rest) as Prisma.Result<T, A, 'findMany'>;

          if (cache && result) {
            const serializedResult = stringify(result);

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

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].create(rest) as Prisma.Result<T, A, 'create'>;

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

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].update(rest) as Prisma.Result<T, A, 'update'>;

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

          const result = await (ctx as unknown as { $parent: { [key: string]: PrismaModel } }).$parent[ctx.$name as string].delete(rest) as Prisma.Result<T, A, 'delete'>;

          return result;
        },
      },
    },
  });
};
