import { Context, Hono, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { MiddlewareHandler, Variables } from 'hono/types';
import { StatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';
import { Bindings } from '../env';
import { bodyParsingMiddleware, queryParsingMiddleware } from './middleware';
import { MutationOperation, QueryOperation } from './types';

type OperationType<I extends Record<string, unknown>, O> =
  | QueryOperation<I, O>
  | MutationOperation<I, O>;

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
export const router = <
  T extends Record<string, OperationType<Record<string, unknown>, Record<string, unknown>>>,
>(
  obj: T,
) => {
  const route = new Hono<{ Bindings: Bindings; Variables: any }>().onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json(
        {
          error: 'Server Error',
          message: err.message,
          type: 'HTTPException',
        },
        err.status,
      );
    } else {
      return c.json(
        {
          error: 'Unknown Error',
          message: 'An unexpected error occurred',
          type: 'UnknownError',
        },
        500,
      );
    }
  });

  Object.entries(obj).forEach(([key, operation]) => {
    const path = `/${key}` as const;

    const operationMiddlewares: MiddlewareHandler[] = operation.middlewares.map((middleware) => {
      /**
       * Wraps middleware execution and updates context with results.
       */
      const wrapperFunction = async (c: Context, next: Next) => {
        const ctx = c.get('__middleware_output') ?? ({} as Record<string, never>);

        /**
         * Updates context with new arguments and sets middleware output.
         */
        const nextWrapper = <B>(args: B) => {
          c.set('__middleware_output', { ...ctx, ...args });
          return { ...ctx, ...args };
        };

        const res = await middleware({ ctx, next: nextWrapper, c });
        c.set('__middleware_output', { ...ctx, ...res });

        await next();
      };

      return wrapperFunction;
    });

    if (operation.type === 'query') {
      if (operation.schema) {
        route.get(path, queryParsingMiddleware, ...operationMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          const parsedQuery = c.get('parsedQuery');

          let input;
          try {
            input = operation.schema?.parse(parsedQuery);
          } catch (err) {
            if (err instanceof ZodError) {
              throw new HTTPException(400, {
                cause: err,
                message: err.message,
              });
            } else {
              throw err;
            }
          }

          return operation.handler({ c, ctx, input });
        });
      } else {
        route.get(path, ...operationMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};

          return operation.handler({ c, ctx, input: undefined });
        });
      }
    } else if (operation.type === 'mutation') {
      if (operation.schema) {
        route.post(path, bodyParsingMiddleware, ...operationMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          const parsedBody = c.get('parsedBody');

          let input;
          try {
            input = operation.schema?.parse(parsedBody);
          } catch (err) {
            if (err instanceof ZodError) {
              throw new HTTPException(400, {
                cause: err,
                message: err.message,
              });
            } else {
              throw err;
            }
          }

          return operation.handler({ c, ctx, input });
        });
      } else {
        route.post(path, ...operationMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};

          return operation.handler({ c, ctx, input: undefined });
        });
      }
    }
  });

  type InferInput<T> =
    T extends OperationType<infer I, Record<string, unknown>> ? I : Record<string, never>;
  type InferOutput<T> =
    T extends OperationType<Record<string, unknown>, infer I> ? I : Record<string, never>;

  return route as Hono<
    { Bindings: Bindings; Variables: Variables },
    {
      [K in keyof T]: T[K] extends QueryOperation<Record<string, unknown>, Record<string, unknown>>
        ? {
            $get: {
              input: InferInput<T[K]>;
              output: InferOutput<T[K]>;
              outputFormat: 'json';
              status: StatusCode;
            };
          }
        : {
            $post: {
              input: InferInput<T[K]>;
              output: InferOutput<T[K]>;
              outputFormat: 'json';
              status: StatusCode;
            };
          };
    }
  >;
};
