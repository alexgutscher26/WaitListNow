'use client';

import * as React from 'react';
import { SignUp } from '@clerk/nextjs';

/**
 * Renders a SignUp component with specified redirect URLs.
 */
const Page = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp
        fallbackRedirectUrl="/welcome"
        forceRedirectUrl="/welcome"
      />
    </div>
  );
};

export default Page;
