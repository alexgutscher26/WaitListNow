'use client';
import { SignUp } from '@clerk/nextjs';
/**
 * Renders a SignUp component with specified redirect URLs.
 */
var Page = function () {
    return (<div className="w-full flex-1 flex items-center justify-center">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome"/>
    </div>);
};
export default Page;
//# sourceMappingURL=page.jsx.map