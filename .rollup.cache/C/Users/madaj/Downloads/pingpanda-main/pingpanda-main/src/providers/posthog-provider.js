'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
export function PostHogProvider(_a) {
    var children = _a.children;
    useEffect(function () {
        // Initialize PostHog here if needed
    }, []);
    return (_jsxs(PHProvider, { client: posthog, children: [_jsx(SuspendedPostHogPageView, {}), children] }));
}
function PostHogPageView() {
    var pathname = usePathname();
    var searchParams = useSearchParams();
    var posthog = usePostHog();
    useEffect(function () {
        if (pathname && posthog) {
            var url = window.origin + pathname;
            var search = searchParams.toString();
            if (search) {
                url += '?' + search;
            }
            posthog.capture('$pageview', { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);
    return null;
}
function SuspendedPostHogPageView() {
    return (_jsx(Suspense, { fallback: null, children: _jsx(PostHogPageView, {}) }));
}
//# sourceMappingURL=posthog-provider.js.map