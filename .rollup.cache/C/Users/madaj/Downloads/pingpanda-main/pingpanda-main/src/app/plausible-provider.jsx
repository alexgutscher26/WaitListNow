'use client';
import { useEffect } from 'react';
import plausible from '@/lib/plausible';
/**
 * Initializes Plausible Analytics and renders its children.
 */
export function PlausibleProvider(_a) {
    var children = _a.children;
    useEffect(function () {
        // Initialize Plausible Analytics on client side
        plausible.initialize();
    }, []);
    return children;
}
//# sourceMappingURL=plausible-provider.jsx.map