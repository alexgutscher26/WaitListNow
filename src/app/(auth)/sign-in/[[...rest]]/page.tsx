'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

/**
 * Renders a page with a sign-in component, redirecting based on search params.
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
