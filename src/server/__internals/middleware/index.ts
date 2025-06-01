/**
 * Internal middlewares
 * Do not modify unless you know what you're doing
 */

import { MiddlewareHandler } from 'hono';
import { parseSuperJSON } from './utils';

/**
 * Parses query parameters of a GET request and attaches them to the context.
 */
export const queryParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawQuery = c.req.query();
  const parsedQuery: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawQuery)) {
    parsedQuery[key] = parseSuperJSON(value);
  }

  c.set('parsedQuery', parsedQuery);
  await next();
};

/**
 * Middleware to parse POST requests using SuperJSON and store the result in the context.
 *
 * This function reads the raw JSON body from the request, parses each value using `parseSuperJSON`,
 * and stores the parsed body in the context under the key 'parsedBody'. It then proceeds to the next middleware or handler.
 */
export const bodyParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawBody = await c.req.json();
  const parsedBody: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawBody)) {
    parsedBody[key] = parseSuperJSON(value as unknown);
  }

  c.set('parsedBody', parsedBody);
  await next();
};
