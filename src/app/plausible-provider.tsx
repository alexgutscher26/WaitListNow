"use client"

import { useEffect } from 'react';

import plausible from '@/lib/plausible';

export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Plausible Analytics on client side
    plausible.initialize();
  }, []);

  return <>{children}</>;
}
