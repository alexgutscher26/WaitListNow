/* eslint-disable import/no-default-export */
import { PostHog } from 'posthog-node';

/**
 * Initializes and returns a new PostHog client instance.
 */
export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
