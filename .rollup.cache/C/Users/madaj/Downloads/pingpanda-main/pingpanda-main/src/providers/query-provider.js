'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
/**
 * Provides a QueryClient and QueryClientProvider to its children components with default configuration.
 */
export function QueryProvider(_a) {
    var children = _a.children;
    return _jsx(QueryClientProvider, { client: queryClient, children: children });
}
//# sourceMappingURL=query-provider.js.map