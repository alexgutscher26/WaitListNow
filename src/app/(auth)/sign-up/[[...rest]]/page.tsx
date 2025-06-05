'use client';

import { SignUp } from '@clerk/nextjs';
import * as React from 'react';

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

export { Page };
