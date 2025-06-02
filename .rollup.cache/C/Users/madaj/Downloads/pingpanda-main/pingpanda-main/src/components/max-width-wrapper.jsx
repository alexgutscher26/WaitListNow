import React from 'react';
import { cn } from '@/utils';
/**
 * Renders a wrapper with a max-width constraint and padding.
 */
export var MaxWidthWrapper = function (_a) {
    var className = _a.className, children = _a.children;
    return (<div className={cn('h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>);
};
//# sourceMappingURL=max-width-wrapper.jsx.map