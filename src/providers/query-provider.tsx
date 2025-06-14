'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from '@/lib/query-client';

/**
 * Provides a QueryClient and QueryClientProvider to its children components with default configuration.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
