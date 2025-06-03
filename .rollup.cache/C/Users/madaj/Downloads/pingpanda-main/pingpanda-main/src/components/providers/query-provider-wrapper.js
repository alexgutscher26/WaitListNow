'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export function QueryProvider(_a) {
    var children = _a.children;
    var queryClient = useState(function () {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000, // 1 minute
                    refetchOnWindowFocus: false,
                    retry: 1,
                },
            },
        });
    })[0];
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [children, _jsx(ReactQueryDevtools, { initialIsOpen: false })] }));
}
//# sourceMappingURL=query-provider-wrapper.js.map