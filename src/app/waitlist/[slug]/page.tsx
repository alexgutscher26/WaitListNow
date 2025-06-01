import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { WaitlistWidget } from '@/components/waitlist-widget';

interface WaitlistPageProps {
  params: {
    slug: string;
  };
}

/**
 * Renders a waitlist page based on the provided slug.
 *
 * The function first attempts to fetch the waitlist by slug from the database.
 * If the waitlist is not found, it returns a message indicating that the waitlist has ended.
 * If the waitlist status is not 'ACTIVE', it displays an appropriate message based on the status.
 * For active waitlists, it retrieves and applies style and settings, then renders the waitlist widget
 * with the specified styling. It also displays the number of subscribers and optionally a branding badge.
 *
 * @param params - An object containing the slug parameter used to fetch the waitlist.
 */
export default async function WaitlistPage({ params }: WaitlistPageProps) {
  // console.log('Fetching waitlist with slug:', params.slug);

  try {
    // First try to find the waitlist by slug without status filter
    const waitlist = await db.waitlist.findFirst({
      where: {
        slug: params.slug,
      },
      include: {
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
    });

    // console.log('Found waitlist (any status):', waitlist);

    if (!waitlist) {
      // console.log('Waitlist not found, showing ended message for slug:', params.slug);
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Waitlist Ended</h1>
              <p className="text-muted-foreground">
                This waitlist is no longer active or has ended.
              </p>
              <p className="text-sm text-muted-foreground">
                If you believe this is a mistake, please contact the waitlist owner.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (waitlist.status !== 'ACTIVE') {
      // Don't log an error since we're handling this case gracefully
      // console.log(`Waitlist found with status: ${waitlist.status}. Showing appropriate message.`);
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{waitlist.name}</h1>
              <p className="text-muted-foreground">
                This waitlist is currently {waitlist.status.toLowerCase()}.
              </p>
              {waitlist.status === 'DRAFT' && (
                <p className="text-sm text-muted-foreground">
                  The owner of this waitlist needs to publish it before it can be accessed.
                </p>
              )}
              {waitlist.status === 'PAUSED' && (
                <p className="text-sm text-muted-foreground">
                  This waitlist is currently paused. Please check back later.
                </p>
              )}
              {waitlist.status === 'ARCHIVED' && (
                <p className="text-sm text-muted-foreground">
                  This waitlist has been archived and is no longer accepting new signups.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Type definitions for style and settings
    type WaitlistStyle = {
      buttonText?: string;
      buttonColor?: string;
      buttonTextColor?: string;
      backgroundColor?: string;
      textColor?: string;
      borderRadius?: number;
      fontFamily?: string;
      showLabels?: boolean;
      formLayout?: 'stacked' | 'inline';
      showBranding?: boolean;
    };

    // Settings type definition
    type WaitlistSettings = {
      [key: string]: unknown;
    };

    // Get the style and settings objects with type safety
    const style: WaitlistStyle =
      waitlist.style && typeof waitlist.style === 'object' && !Array.isArray(waitlist.style)
        ? (waitlist.style as WaitlistStyle)
        : {};

    const settings: WaitlistSettings =
      waitlist.settings &&
      typeof waitlist.settings === 'object' &&
      !Array.isArray(waitlist.settings)
        ? (waitlist.settings as WaitlistSettings)
        : {};

    const showBranding = style.showBranding !== false;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Browser-style header */}
          <div className="bg-gray-200 rounded-t-xl px-4 py-3 flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-700 text-sm font-normal">waitlist.yourdomain.com</span>
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <div className="px-12 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {waitlist.name || 'Join the Waitlist'}
              </h1>

              {waitlist.description ? (
                <p className="text-gray-600 text-lg mb-12 leading-relaxed font-normal">
                  {waitlist.description}
                </p>
              ) : (
                <p className="text-gray-600 text-lg mb-12 leading-relaxed font-normal">
                  Be the first to know when we launch. Early adopters get exclusive perks!
                </p>
              )}

              <WaitlistWidget
                waitlistId={waitlist.id}
                style={{
                  buttonText: style.buttonText,
                  buttonColor: style.buttonColor,
                  buttonTextColor: style.buttonTextColor,
                  backgroundColor: style.backgroundColor,
                  textColor: style.textColor,
                  borderRadius: style.borderRadius,
                  fontFamily: style.fontFamily,
                  showLabels: style.showLabels,
                  formLayout: style.formLayout,
                }}
              />

              <p className="text-gray-500 text-base font-normal mb-6">
                Join{' '}
                {waitlist.subscriberCount > 0
                  ? waitlist.subscriberCount.toLocaleString()
                  : '1,247'}{' '}
                others on the waitlist
              </p>

              {/* Powered by WaitlistNow badge - can be hidden after payment */}
              {showBranding && (
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
                    <span>Powered by</span>
                    <a
                      href="https://waitlistnow.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      WaitlistNow
                    </a>
                    <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                      PRO
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: WaitlistPageProps) {
  try {
    const waitlist = await db.waitlist.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!waitlist) {
      return {
        title: 'Waitlist Not Found',
        description: 'The requested waitlist could not be found.',
      };
    }

    return {
      title: waitlist.name,
      description: waitlist.description || `Join the waitlist for ${waitlist.name}`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Waitlist',
      description: 'Join our waitlist to be the first to know when we launch.',
    };
  }
}
