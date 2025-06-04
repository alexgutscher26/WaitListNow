'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Import providers
const ClerkProvider = dynamic(
  () => import('@/providers/clerk-provider').then(mod => mod.ClerkProvider),
  { ssr: true, loading: () => null }
);

const QueryProvider = dynamic(
  () => import('@/providers/query-provider').then(mod => mod.QueryProvider),
  { ssr: true, loading: () => null }
);

const PostHogProvider = dynamic(
  () => import('@/providers/posthog-provider').then(mod => mod.PostHogProvider),
  { ssr: true, loading: () => null }
);

// Lazy load client providers with proper code splitting
const ClientProviders = dynamic(
  () => import('@/components/providers/client-providers').then(mod => ({
    default: function DynamicClientProviders({ children }: { children: React.ReactNode }) {
      return <mod.ClientProviders>{children}</mod.ClientProviders>;
    }
  })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }
);

// Client components with dynamic imports
const ClientSideComponents = dynamic(
  () => import('@/components/client-side-components').then(mod => ({
    default: function DynamicClientComponents() {
      return <mod.ClientSideComponents />;
    }
  })),
  { 
    ssr: false,
    loading: () => null
  }
);

interface ClientLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export function ClientLayout({ children, modal }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until the component is mounted on the client
  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // For dashboard routes, only render the children as they have their own layout
  if (isDashboardRoute) {
    return (
      <ClerkProvider>
        <QueryProvider>
          <PostHogProvider>
            <ClientProviders>
              {children}
              {modal}
              <ClientSideComponents />
            </ClientProviders>
          </PostHogProvider>
        </QueryProvider>
      </ClerkProvider>
    );
  }

  // For non-dashboard routes, use the default layout
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
