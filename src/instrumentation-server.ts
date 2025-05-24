import * as Sentry from '@sentry/nextjs';

// Server-side Sentry initialization
export default function init() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV === 'development',
  });
}
