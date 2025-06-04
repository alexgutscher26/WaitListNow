import { Context, TypedResponse } from 'hono';
import { z } from 'zod';

import { httpHandler } from '@/server';
import { Variables } from 'hono/types';
import { Bindings } from '../env';

export type Middleware<Ctx> = ({
  ctx,
  next,
  c,
}: {
  ctx: Ctx;
  next: <B>(args?: B) => B & Ctx;
  c: Context<{ Bindings: Bindings; Variables: Variables }>;
}) => Promise<unknown>;

export type QueryOperation<Schema extends Record<string, unknown>, ZodInput = never> = {
  type: 'query';
  schema?: z.ZodType<Schema>;
  handler: <Ctx, Output>({
    ctx,
    c,
    input,
  }: {
    ctx: Ctx;
    c: Context;
    input: ZodInput;
  }) => Promise<TypedResponse<Output>>;
  middlewares: Middleware<unknown>[];
};

export type MutationOperation<Schema extends Record<string, unknown>, ZodInput = never> = {
  type: 'mutation';
  schema?: z.ZodType<Schema>;
  handler: <Input, Output>({
    ctx,
    c,
  }: {
    ctx: Input;
    c: Context;
    input: ZodInput;
  }) => Promise<TypedResponse<Output>>;
  middlewares: Middleware<unknown>[];
};

export { httpHandler as GET, httpHandler as POST };
