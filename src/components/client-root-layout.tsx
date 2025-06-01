'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export interface ClientRootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

// Client-side layout with dynamic imports
const ClientLayout = dynamic(
  () => import('@/components/client-layout').then(mod => mod.ClientLayout),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
);

// Server providers with dynamic import
const Providers = dynamic(
  () => import('../app/providers').then(mod => ({ default: mod.Providers })),
  { 
    ssr: true,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
);

export function ClientRootLayout({ children, modal }: ClientRootLayoutProps) {
  return (
    <Providers>
      <ClientLayout modal={modal}>
        {children}
      </ClientLayout>
    </Providers>
  );
}
