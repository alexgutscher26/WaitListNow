'use client';

import dynamic from 'next/dynamic';
import React, { type ReactNode } from 'react';

// Client-side only providers

const HeroUIProvider = dynamic(() => import('@heroui/react').then((mod) => mod.HeroUIProvider), {
  ssr: false,
  loading: () => null,
});

// Lazy load non-critical components
const Toaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster), {
  ssr: false,
  loading: () => null,
});

const Analytics = dynamic(() => import('@vercel/analytics/react').then((mod) => mod.Analytics), {
  ssr: false,
  loading: () => null,
});

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  { ssr: false, loading: () => null },
);

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <HeroUIProvider>
      {children}
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </HeroUIProvider>
  );
}
