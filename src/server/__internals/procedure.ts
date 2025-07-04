/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default-member */
import { Context, TypedResponse } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import superjson from 'superjson';
import { z } from 'zod';
import { Bindings } from '../env';
import { Middleware, MutationOperation, QueryOperation } from './types';

/**
 * Type-level SuperJSON integration
 */
declare module 'hono' {
  interface Context {
    superjson: <T>(data: T, status?: number) => SuperJSONTypedResponse<T>;
  }
}

type SuperJSONParsedType<T> = ReturnType<typeof superjson.parse<T>>;
export type SuperJSONTypedResponse<T, U extends StatusCode = StatusCode> = TypedResponse<
  SuperJSONParsedType<T>,
  U,
  'json'
>;

export class Procedure<ctx = Record<string, never>> {
  private readonly middlewares: Middleware<ctx>[] = [];

  /**
   * Optional, but recommended:
   * This makes "c.superjson" available to your API routes
   */
  private static async superjsonMiddleware<Ctx>({
    c,
    next,
  }: Parameters<Middleware<Ctx>>[0]): Promise<unknown> {
    c.superjson = ((data: unknown, status?: StatusCode): Response => {
      const serialized = superjson.stringify(data);
      return new Response(serialized, {
        status: status || 200,
        headers: { 'Content-Type': 'application/superjson' },
      });
    }) as typeof c.json;

    return await next();
  }

  constructor(middlewares: Middleware<ctx>[] = []) {
    this.middlewares = middlewares;

    // add built-in superjson middleware if not already present
    if (!this.middlewares.some((mw) => mw.name === 'superjsonMiddleware')) {
      this.middlewares.push(Procedure.superjsonMiddleware);
    }
  }

  /**
   * Adds a middleware function to the procedure chain and returns a new procedure with updated context.
   */
  use<T, Return = void>(
    fn: ({
      ctx,
      next,
      c,
    }: {
      ctx: ctx;
      next: <B>(args?: B) => Promise<B & ctx>;
      c: Context<{ Bindings: Bindings }>;
    }) => Promise<Return>,
  ): Procedure<ctx & T & Return> {
    return new Procedure<ctx & T & Return>([...this.middlewares, fn as any]);
  }

  input = <Schema extends Record<string, unknown>>(schema: z.ZodSchema<Schema>) => ({
    query: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: Bindings }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>,
    ): QueryOperation<Schema, Output> => ({
      type: 'query',
      schema,
      handler: fn as any,
      middlewares: this.middlewares as Middleware<unknown>[],
    }),

    mutation: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: Bindings }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>,
    ): MutationOperation<Schema, Output> => ({
      type: 'mutation',
      schema,
      handler: fn as any,
      middlewares: this.middlewares as Middleware<unknown>[],
    }),
  });

  /**
   * Registers a query operation with the specified function and returns it.
   */
  query<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: Bindings }>;
    }) => SuperJSONTypedResponse<Output> | Promise<SuperJSONTypedResponse<Output>>,
  ): QueryOperation<Record<string, never>, Output> {
    return {
      type: 'query',
      handler: fn as any,
      middlewares: this.middlewares as Middleware<unknown>[],
    };
  }

  /**
   * Registers a mutation operation with specified handler and middleware.
   */
  mutation<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: Bindings }>;
    }) => TypedResponse<Output> | Promise<TypedResponse<Output>>,
  ): MutationOperation<Record<string, never>, Output> {
    return {
      type: 'mutation',
      handler: fn as any,
      middlewares: this.middlewares as Middleware<unknown>[],
    };
  }
}
