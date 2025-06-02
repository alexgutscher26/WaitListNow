'use client';
import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
/**
 * Renders a sign-in page with conditional redirection based on search params.
 */
var Page = function () {
    var searchParams = useSearchParams();
    var intent = searchParams.get('intent');
    return (<div className="w-full flex-1 flex items-center justify-center">
      <SignIn forceRedirectUrl={intent ? "/dashboard?intent=".concat(intent) : '/dashboard'}/>
    </div>);
};
export default Page;
//# sourceMappingURL=page.jsx.map