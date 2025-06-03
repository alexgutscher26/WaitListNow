import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils';
var Separator = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? 'horizontal' : _b, props = __rest(_a, ["className", "orientation"]);
    return (_jsx("div", __assign({ ref: ref, className: cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className) }, props)));
});
Separator.displayName = 'Separator';
export { Separator };
//# sourceMappingURL=separator.js.map