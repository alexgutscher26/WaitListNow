import React from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { RootLayoutClient } from '@/components/root-layout-client';
import { ClerkProvider } from '@/components/providers/clerk-provider-wrapper';
import { QueryProvider } from '@/components/providers/query-provider-wrapper';
import './globals.css';
// Font configuration - loaded on the server
var inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans',
});
// Export metadata
export var metadata = {
    title: {
        default: 'WaitlistNow - Build Your Waitlist in Minutes',
        template: '%s | WaitlistNow',
    },
    description: 'Launch your product with a beautiful, high-converting waitlist. Start collecting leads and building your audience today.',
    keywords: ['waitlist', 'launch', 'saas', 'startup', 'early access', 'beta'],
    authors: [{ name: 'WaitlistNow Team' }],
    creator: 'WaitlistNow',
    publisher: 'WaitlistNow',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://waitlistnow.app'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_APP_URL,
        title: 'WaitlistNow - Build Your Waitlist in Minutes',
        description: 'Launch your product with a beautiful, high-converting waitlist. Start collecting leads and building your audience today.',
        siteName: 'WaitlistNow',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WaitlistNow - Build Your Waitlist in Minutes',
        description: 'The easiest way to launch your product with a beautiful waitlist.',
        creator: '@waitlistnow',
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};
// Viewport configuration
export var viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};
export default function RootLayout(_a) {
    var children = _a.children, modal = _a.modal;
    return (<html lang="en" className={cn('h-full', inter.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_CDN_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} crossOrigin="anonymous"/>
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <QueryProvider>
          <ClerkProvider>
            <RootLayoutClient modal={modal}>
              {children}
            </RootLayoutClient>
          </ClerkProvider>
        </QueryProvider>
      </body>
    </html>);
}
//# sourceMappingURL=layout.jsx.map