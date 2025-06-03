'use client';
import React from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
export function PostHogProvider(_a) {
    var children = _a.children;
    useEffect(function () {
        // Initialize PostHog here if needed
    }, []);
    return (<PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>);
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
    return (<Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>);
}
//# sourceMappingURL=posthog-provider.jsx.map