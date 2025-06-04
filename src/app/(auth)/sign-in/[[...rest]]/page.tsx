'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

/**
 * Renders a sign-in page with conditional redirection based on search params.
 */
const Page = () => {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : '/dashboard'} />
    </div>
  );
};

export default Page;
