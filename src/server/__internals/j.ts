import { Context } from 'hono';
import { Bindings } from '../env';
import { Procedure } from './procedure';

const baseProcedure = new Procedure();

type MiddlewareFunction<T = Record<string, never>, R = void> = (params: {
  ctx: T;
  next: <B>(args: B) => Promise<B & T>;
  c: Context<{ Bindings: Bindings }>;
}) => Promise<R>;

/**
 * A helper to easily define middlewares and new procedures
 */

export const j = {
  middleware: <T = Record<string, never>, R = void>(
    fn: MiddlewareFunction<T, R>,
  ): MiddlewareFunction<T, R> => {
    return fn;
  },
  procedure: baseProcedure,
};
