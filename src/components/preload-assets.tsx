'use client';

import { useEffect } from 'react';
import { preloadCriticalAssets } from '@/lib/cdn-utils';

/**
 * Client component for preloading critical assets
 * This should be used inside a client component boundary
 */
export const PreloadAssets = (): null => {
  useEffect(() => {
    preloadCriticalAssets();
  }, []);

  return null;
};
