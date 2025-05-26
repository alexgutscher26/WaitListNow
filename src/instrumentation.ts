import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/replay';

// This file is used to initialize Sentry for both client and server
// It's automatically loaded by Next.js

/**
 * Registers Sentry instrumentation based on the runtime environment.
 *
 * This function initializes Sentry differently depending on whether it's running
 * in a Node.js server, an edge runtime, or as a client-side application. For
 * server-side environments, it imports specific server-side instrumentation.
 * For edge runtimes, it imports edge-specific modules. On the client side,
 * it configures Sentry with replay integration and other settings for better
 * error tracking and performance monitoring.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side Sentry initialization
    await import('./instrumentation-server');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime Sentry initialization
    await import('./instrumentation-edge');
  }

  if (process.env.NEXT_RUNTIME === 'client') {
    // Client-side Sentry initialization
    const replay = new Replay({
      maskAllText: false,
      blockAllMedia: false,
    });

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
      integrations: [replay],
      tracePropagationTargets: ['localhost', /^https:\/\/api\.yourdomain\.com\/api/],
    });
  }
}
