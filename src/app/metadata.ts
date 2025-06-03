import { Metadata, Viewport } from 'next';

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
