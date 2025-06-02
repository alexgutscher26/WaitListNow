'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
export function ClerkProvider(_a) {
    var children = _a.children;
    var pathname = usePathname();
    return (_jsx(ClerkProviderBase, { appearance: {
            elements: {
                formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
                footerActionLink: 'text-brand-600 hover:text-brand-700',
            },
        }, signInUrl: "/sign-in?redirect_url=".concat(encodeURIComponent(pathname)), signUpUrl: "/sign-up?redirect_url=".concat(encodeURIComponent(pathname)), children: children }));
}
//# sourceMappingURL=clerk-provider.js.map