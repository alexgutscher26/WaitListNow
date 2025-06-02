import { __rest } from "tslib";
import * as React from 'react';
import { cn } from '@/utils';
var Separator = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? 'horizontal' : _b, props = __rest(_a, ["className", "orientation"]);
    return (<div ref={ref} className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)} {...props}/>);
});
Separator.displayName = 'Separator';
export { Separator };
//# sourceMappingURL=separator.jsx.map