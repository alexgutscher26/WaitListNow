'use client';

import { useEffect } from 'react';

import plausible from '@/lib/plausible';

/**
 * Initializes Plausible Analytics and renders its children.
 */
export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Plausible Analytics on client side
    plausible.initialize();
  }, []);

  return children;
}
