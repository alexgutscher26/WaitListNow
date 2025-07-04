/* eslint-disable import/order */
/* eslint-disable import/no-default-export */
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { ClerkProvider } from '@/components/providers/clerk-provider-wrapper';
import { QueryProvider } from '@/components/providers/query-provider-wrapper';
import { RootLayoutClient } from '@/components/root-layout-client';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from 'sonner';

// Font configuration - loaded on the server
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

// Export metadata
export const metadata: Metadata = {
  title: {
    default: 'WaitlistNow - Build Your Waitlist in Minutes',
    template: '%s | WaitlistNow',
  },
  description:
    'Launch your product with a beautiful, high-converting waitlist. Start collecting leads and building your audience today.',
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
    description:
      'Launch your product with a beautiful, high-converting waitlist. Start collecting leads and building your audience today.',
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
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

/**
 * Renders the root layout of the application with necessary providers and components.
 */
export default function RootLayout({ children, modal }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={cn('h-full', inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href={
            process.env.NEXT_PUBLIC_CDN_URL ||
            process.env.NEXT_PUBLIC_APP_URL ||
            'http://localhost:3000'
          }
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <QueryProvider>
          <ClerkProvider>
            <RootLayoutClient modal={modal}>
              {children}
              <Toaster />
            </RootLayoutClient>
          </ClerkProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
