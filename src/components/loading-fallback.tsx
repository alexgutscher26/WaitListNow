'use client';

import React, { useEffect } from 'react';
import { preloadCriticalAssets } from '@/lib/cdn-utils';

/**
 * Loading fallback component with asset preloading
 */
export function LoadingFallback() {
  // Preload critical assets when the loading state is shown
  useEffect(() => {
    preloadCriticalAssets();
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
