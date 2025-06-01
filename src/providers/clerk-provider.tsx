'use client';

import React from 'react';

import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ClerkProviderBase
      appearance={{
        elements: {
          formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
          footerActionLink: 'text-brand-600 hover:text-brand-700',
        },
      }}
      signInUrl={`/sign-in?redirect_url=${encodeURIComponent(pathname)}`}
      signUpUrl={`/sign-up?redirect_url=${encodeURIComponent(pathname)}`}
    >
      {children}
    </ClerkProviderBase>
  );
}
