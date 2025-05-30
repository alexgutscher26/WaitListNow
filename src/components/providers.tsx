'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HTTPException } from 'hono/http-exception';
import { PropsWithChildren, useState } from 'react';
import { PostHogProvider } from '../providers/posthog-provider';

/**
 * Provides a PostHogProvider and a QueryClientProvider with error handling for HTTP and generic errors.
 */
export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            let errorMessage: string;
            if (err instanceof HTTPException) {
              errorMessage = err.message;
            } else if (err instanceof Error) {
              errorMessage = err.message;
            } else {
              errorMessage = 'An unknown error occurred.';
            }
            // toast notify user, log as an example
            // console.log(errorMessage);
          },
        }),
      }),
  );

  return (
    <PostHogProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PostHogProvider>
  );
};
