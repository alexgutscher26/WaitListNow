'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HTTPException } from 'hono/http-exception';
import { PostHogProvider } from '../providers/posthog-provider';
/**
 * Provides a PostHogProvider and a QueryClientProvider with error handling for HTTP and generic errors.
 */
export var Providers = function (_a) {
    var children = _a.children;
    var queryClient = useState(function () {
        return new QueryClient({
            queryCache: new QueryCache({
                onError: function (err) {
                    if (err instanceof HTTPException) {
                        // Handle HTTP errors
                        console.error('HTTP Error:', err.message);
                    }
                    else if (err instanceof Error) {
                        // Handle other errors
                        console.error('Error:', err.message);
                    }
                    else {
                        // Handle unknown errors
                        console.error('An unknown error occurred');
                    }
                    // toast notify user, log as an example
                    // console.log(errorMessage);
                },
            }),
        });
    })[0];
    return (_jsx(PostHogProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: children }) }));
};
//# sourceMappingURL=providers.js.map