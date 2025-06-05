'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load client components with proper code splitting
const PreloadAssets = dynamic(
  () => import('@/components/preload-assets').then((mod) => mod.PreloadAssets),
  { ssr: false, loading: () => null },
);

const LoadingFallback = dynamic(
  () => import('@/components/loading-fallback').then((mod) => mod.LoadingFallback),
  { ssr: false, loading: () => null },
);

export function ClientSideComponents() {
  return (
    <>
      <PreloadAssets />
      <LoadingFallback />
    </>
  );
}
