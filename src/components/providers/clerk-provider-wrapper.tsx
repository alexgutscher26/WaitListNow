'use client';

import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
import React from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProviderBase
      appearance={{
        elements: {
          formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
          footerActionLink: 'text-brand-600 hover:text-brand-700',
        },
      }}
    >
      {children}
    </ClerkProviderBase>
  );
}
