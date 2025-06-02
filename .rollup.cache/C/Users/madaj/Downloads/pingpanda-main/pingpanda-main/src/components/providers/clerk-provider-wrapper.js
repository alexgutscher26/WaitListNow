'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
export function ClerkProvider(_a) {
    var children = _a.children;
    return (_jsx(ClerkProviderBase, { appearance: {
            elements: {
                formButtonPrimary: 'bg-brand-600 hover:bg-brand-700',
                footerActionLink: 'text-brand-600 hover:text-brand-700',
            },
        }, children: children }));
}
//# sourceMappingURL=clerk-provider-wrapper.js.map