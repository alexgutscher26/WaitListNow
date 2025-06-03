'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// Client-side only providers
var PlausibleProvider = dynamic(function () { return import('@/app/plausible-provider').then(function (mod) { return mod.PlausibleProvider; }); }, {
    ssr: false,
    loading: function () { return null; }
});
var HeroUIProvider = dynamic(function () { return import('@heroui/react').then(function (mod) { return mod.HeroUIProvider; }); }, {
    ssr: false,
    loading: function () { return null; }
});
// Lazy load non-critical components
var Toaster = dynamic(function () { return import('@/components/ui/toaster').then(function (mod) { return mod.Toaster; }); }, { ssr: false, loading: function () { return null; } });
var Analytics = dynamic(function () { return import('@vercel/analytics/react').then(function (mod) { return mod.Analytics; }); }, { ssr: false, loading: function () { return null; } });
var SpeedInsights = dynamic(function () { return import('@vercel/speed-insights/next').then(function (mod) { return mod.SpeedInsights; }); }, { ssr: false, loading: function () { return null; } });
export function ClientProviders(_a) {
    var children = _a.children;
    return (<PlausibleProvider>
      <HeroUIProvider>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </HeroUIProvider>
    </PlausibleProvider>);
}
//# sourceMappingURL=client-providers.jsx.map