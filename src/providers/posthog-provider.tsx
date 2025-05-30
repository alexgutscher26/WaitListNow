'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      // Only initialize in browser and if the key exists
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: '/ingest',
          ui_host: 'https://us.posthog.com',
          capture_pageview: false, // We capture pageviews manually
          capture_pageleave: true, // Enable pageleave capture
          capture_exceptions: true, // This enables capturing exceptions using Error Tracking
          debug: process.env.NODE_ENV === 'development',
          loaded: (posthog) => {
            // Silently handle any loading errors
            if (process.env.NODE_ENV === 'development') {
              // Only log in development
              posthog.debug(process.env.NODE_ENV === 'development');
            }
          },
        });
      }
    } catch (error) {
      // Silently handle initialization errors
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog initialization error:', error);
      }
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += '?' + search;
      }
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
