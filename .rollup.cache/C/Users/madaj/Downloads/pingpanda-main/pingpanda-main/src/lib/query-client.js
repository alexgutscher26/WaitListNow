import { QueryClient } from '@tanstack/react-query';
// Create a client
var queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
export { queryClient };
//# sourceMappingURL=query-client.js.map