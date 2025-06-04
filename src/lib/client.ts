import { hc } from 'hono/client';
import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { parse, stringify } from 'superjson';
import { AppType } from '@/server';

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
const getBaseUrl = () => {
  // browser should use relative path
  if (typeof window !== 'undefined') {
    return '';
  }

  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://<YOUR_DEPLOYED_WORKER_URL>/';
};

export const baseClient = hc<AppType>(getBaseUrl(), {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, { ...init, cache: 'no-store' });

    if (!response.ok) {
      throw new HTTPException(response.status as ContentfulStatusCode, {
        message: response.statusText,
        res: response,
      });
    }

    const contentType = response.headers.get('Content-Type');

    response.json = async () => {
      const text = await response.text();

      if (contentType === 'application/superjson') {
        return parse(text);
      }

      try {
        return JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        throw new Error('Invalid JSON response');
      }
    };

    return response;
  },
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
function getHandler(obj: object, ...keys: string[]) {
  let current = obj;

  // Check if the object is safe to work with
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('Invalid object provided to getHandler');
  }

  for (const key of keys) {
    // Prevent prototype pollution by checking if the key exists on the object itself
    // and not on its prototype chain
    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      throw new Error(`Property '${key}' does not exist on the target object`);
    }

    const value = current[key as keyof typeof current];

    // Ensure we don't allow access to prototype methods
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      throw new Error(`Access to '${key}' is not allowed`);
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

  return current as (...args: unknown[]) => unknown;
}

/**
 * Serializes an object using SuperJSON for its values.
 */
function serializeWithSuperJSON<T>(data: T): T {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  if (data === null || typeof data !== 'object') {
    return data;
  }
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, stringify(value)]),
  ) as T;
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
function createProxy<T extends object>(target: T, path: string[] = []): T {
  return new Proxy(target, {
    get(target: T, prop: string | symbol, receiver: unknown) {
      if (typeof prop === 'string') {
        const newPath = [...path, prop];

        if (prop === '$get') {
          return async (args: unknown) => {
            const executor = getHandler(baseClient, ...newPath);
            const serializedQuery = serializeWithSuperJSON(args);
            return executor({ query: serializedQuery });
          };
        }

        if (prop === '$post') {
          return async (args: unknown) => {
            const executor = getHandler(baseClient, ...newPath);
            const serializedJson = serializeWithSuperJSON(args);
            return executor({ json: serializedJson });
          };
        }

        // Safe property access with type assertion
        const value = (target as Record<string, unknown>)[prop];
        if (value && typeof value === 'object') {
          return createProxy(value as object, newPath);
        }
        return value;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as T;
}

export const client: typeof baseClient = createProxy(baseClient);
