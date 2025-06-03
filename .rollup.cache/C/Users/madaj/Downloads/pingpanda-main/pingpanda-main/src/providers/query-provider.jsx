'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
/**
 * Provides a QueryClient and QueryClientProvider to its children components with default configuration.
 */
export function QueryProvider(_a) {
    var children = _a.children;
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
//# sourceMappingURL=query-provider.jsx.map