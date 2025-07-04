'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
var Switch = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(SwitchPrimitives.Root, __assign({ className: cn('peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input', className) }, props, { ref: ref, children: _jsx(SwitchPrimitives.Thumb, { className: cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0') }) })));
});
Switch.displayName = SwitchPrimitives.Root.displayName;
export { Switch };
//# sourceMappingURL=switch.js.map