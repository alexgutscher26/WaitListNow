import * as Sentry from "@sentry/nextjs";
import { Replay } from "@sentry/replay";

// Only initialize Sentry in the browser
if (typeof window !== 'undefined') {
  const replay = new Replay({
    // Session replay configuration
    maskAllText: false,
    blockAllMedia: false,
  });

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // Sample 10% of all sessions
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
    // Debug mode (only in development)
    debug: process.env.NODE_ENV === 'development',
    // Integrations
    integrations: [
      // Add the Replay integration
      replay,
      // BrowserTracing is automatically included in @sentry/nextjs
    ],
    // Configure distributed tracing
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/api\.yourdomain\.com\/api/
    ],
  });
}
