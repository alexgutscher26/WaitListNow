'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { type ReactNode } from 'react';

// Lazy load providers with code splitting
const ClerkProvider = dynamic(
  () => import('@/providers/clerk-provider').then((mod) => mod.ClerkProvider),
  { ssr: true, loading: () => null },
);

const QueryProvider = dynamic(
  () => import('@/providers/query-provider').then((mod) => mod.QueryProvider),
  { ssr: true, loading: () => null },
);

const PostHogProvider = dynamic(
  () => import('@/providers/posthog-provider').then((mod) => mod.PostHogProvider),
  { ssr: true, loading: () => null },
);

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <PostHogProvider>
      <ClerkProvider>
        <QueryProvider>{children}</QueryProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
}
