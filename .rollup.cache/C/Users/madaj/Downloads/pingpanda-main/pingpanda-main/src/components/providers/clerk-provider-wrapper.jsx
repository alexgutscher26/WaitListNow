'use client';
import React from 'react';
import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
export function ClerkProvider(_a) {
    var children = _a.children;
    return (<ClerkProviderBase appearance={{
            elements: {
                formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
                footerActionLink: 'text-brand-600 hover:text-brand-700',
            },
        }}>
      {children}
    </ClerkProviderBase>);
}
//# sourceMappingURL=clerk-provider-wrapper.jsx.map