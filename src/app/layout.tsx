import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

// Import client providers component
import { ClientProviders } from '@/components/providers/client-providers';

// Server-side providers that can be used in Server Components
const ClerkProvider = dynamic(
  () => import('@/providers/clerk-provider').then(mod => mod.ClerkProvider),
  { ssr: true }
);

const QueryProvider = dynamic(
  () => import('@/providers/query-provider').then(mod => mod.QueryProvider),
  { ssr: true }
);

const PostHogProvider = dynamic(
  () => import('@/providers/posthog-provider').then(mod => mod.PostHogProvider),
  { ssr: true }
);

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

// Metadata configuration
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
 * Provides the root layout structure for the application, including providers and global components.
 */
export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn('h-full', inter.variable)}
    >
      <body className={cn('min-h-full bg-background font-sans antialiased')}>
        <Suspense fallback={<LoadingFallback />}>
          <PostHogProvider>
            <ClerkProvider>
              <QueryProvider>
                <ClientProviders>
                  <div className="relative flex min-h-screen flex-col">
                    <main className="flex-1">
                      {children}
                      {modal}
                    </main>
                  </div>
                </ClientProviders>
              </QueryProvider>
            </ClerkProvider>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
