import { __rest } from "tslib";
import { cn } from '@/utils';
import * as React from 'react';
var Input = React.forwardRef(function (_a, ref) {
    var className = _a.className, type = _a.type, _b = _a.suppressHydrationWarning, suppressHydrationWarning = _b === void 0 ? true : _b, props = __rest(_a, ["className", "type", "suppressHydrationWarning"]);
    return (<input type={type} className={cn('flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} suppressHydrationWarning={suppressHydrationWarning} {...props}/>);
});
Input.displayName = 'Input';
export { Input };
//# sourceMappingURL=input.jsx.map