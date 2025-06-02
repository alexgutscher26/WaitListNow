'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
// Import providers
var ClerkProvider = dynamic(function () { return import('@/providers/clerk-provider').then(function (mod) { return mod.ClerkProvider; }); }, { ssr: true, loading: function () { return null; } });
var QueryProvider = dynamic(function () { return import('@/providers/query-provider').then(function (mod) { return mod.QueryProvider; }); }, { ssr: true, loading: function () { return null; } });
var PostHogProvider = dynamic(function () { return import('@/providers/posthog-provider').then(function (mod) { return mod.PostHogProvider; }); }, { ssr: true, loading: function () { return null; } });
// Lazy load client providers with proper code splitting
var ClientProviders = dynamic(function () { return import('@/components/providers/client-providers').then(function (mod) { return ({
    default: function DynamicClientProviders(_a) {
        var children = _a.children;
        return <mod.ClientProviders>{children}</mod.ClientProviders>;
    }
}); }); }, {
    ssr: false,
    loading: function () { return (<div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/>
      </div>); }
});
// Client components with dynamic imports
var ClientSideComponents = dynamic(function () { return import('@/components/client-side-components').then(function (mod) { return ({
    default: function DynamicClientComponents() {
        return <mod.ClientSideComponents />;
    }
}); }); }, {
    ssr: false,
    loading: function () { return null; }
});
export function ClientLayout(_a) {
    var children = _a.children, modal = _a.modal;
    var _b = useState(false), mounted = _b[0], setMounted = _b[1];
    var pathname = usePathname();
    var isDashboardRoute = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/dashboard');
    useEffect(function () {
        setMounted(true);
    }, []);
    // Don't render anything until the component is mounted on the client
    if (!mounted) {
        return (<div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/>
      </div>);
    }
    // For dashboard routes, only render the children as they have their own layout
    if (isDashboardRoute) {
        return (<ClerkProvider>
        <QueryProvider>
          <PostHogProvider>
            <ClientProviders>
              {children}
              {modal}
              <ClientSideComponents />
            </ClientProviders>
          </PostHogProvider>
        </QueryProvider>
      </ClerkProvider>);
    }
    // For non-dashboard routes, use the default layout
    return (<ClerkProvider>
      <QueryProvider>
        <PostHogProvider>
          <ClientProviders>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">
                {children}
                {modal}
              </main>
            </div>
            <ClientSideComponents />
          </ClientProviders>
        </PostHogProvider>
      </QueryProvider>
    </ClerkProvider>);
}
//# sourceMappingURL=client-layout.jsx.map