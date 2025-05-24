import * as Sentry from '@sentry/nextjs';

// Edge runtime Sentry initialization
export default function init() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV === 'development',
  });
}
