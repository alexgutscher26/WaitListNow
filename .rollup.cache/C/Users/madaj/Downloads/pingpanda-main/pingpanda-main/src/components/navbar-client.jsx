'use client';
import React from 'react';
import Link from 'next/link';
import { MaxWidthWrapper } from './max-width-wrapper';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Button, buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
/**
 * Client-side navigation bar component that displays user authentication status and respective links.
 * Uses Clerk's useUser hook to get the current user on the client side.
 */
export var NavbarClient = function () {
    var _a = useUser(), isLoaded = _a.isLoaded, isSignedIn = _a.isSignedIn;
    if (!isLoaded) {
        // You can return a loading state or skeleton here
        return (<nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"/>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"/>
          </div>
        </MaxWidthWrapper>
      </nav>);
    }
    return (<nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            Waitlist<span className="text-brand-700">Now</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {isSignedIn ? (<>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    Sign out
                  </Button>
                </SignOutButton>
                <Link href="/dashboard" className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
            })}>
                  Dashboard <ArrowRight className="h-4 w-4"/>
                </Link>
              </>) : (<>
                <Link href="/sign-in" className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
            })}>
                  Sign in
                </Link>
                <Link href="/sign-up" className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
            })}>
                  Get started <ArrowRight className="h-4 w-4"/>
                </Link>
              </>)}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>);
};
//# sourceMappingURL=navbar-client.jsx.map