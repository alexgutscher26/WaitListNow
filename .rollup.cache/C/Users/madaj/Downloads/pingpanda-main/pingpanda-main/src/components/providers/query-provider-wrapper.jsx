'use client';
import React, { useState } from 'react';
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
    return (<QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>);
}
//# sourceMappingURL=query-provider-wrapper.jsx.map