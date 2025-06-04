'use client';

import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import { ClientLayout } from '@/components/client-layout';

// This is a client component that wraps the content with ClientLayout only for non-dashboard routes
function LayoutWrapper({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return <ClientLayout modal={modal}>{children}</ClientLayout>;
}

export function RootLayoutClient({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <LayoutWrapper modal={modal}>
        {children}
      </LayoutWrapper>
    </Suspense>
  );
}
