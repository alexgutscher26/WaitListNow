'use client';
import React from 'react';
import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
export function ClerkProvider(_a) {
    var children = _a.children;
    var pathname = usePathname();
    return (<ClerkProviderBase appearance={{
            elements: {
                formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
                footerActionLink: 'text-brand-600 hover:text-brand-700',
            },
        }} signInUrl={"/sign-in?redirect_url=".concat(encodeURIComponent(pathname))} signUpUrl={"/sign-up?redirect_url=".concat(encodeURIComponent(pathname))}>
      {children}
    </ClerkProviderBase>);
}
//# sourceMappingURL=clerk-provider.jsx.map