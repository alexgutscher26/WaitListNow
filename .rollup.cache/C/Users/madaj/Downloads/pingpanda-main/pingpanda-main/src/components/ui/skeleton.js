import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
var skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
    variants: {
        variant: {
            default: '',
            circle: 'rounded-full',
        },
        size: {
            default: 'h-4 w-full',
            sm: 'h-2 w-16',
            lg: 'h-8 w-24',
            xl: 'h-10 w-32',
            '2xl': 'h-12 w-40',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
/**
 * Renders a skeleton component with specified styling and properties.
 */
function Skeleton(_a) {
    var className = _a.className, variant = _a.variant, size = _a.size, props = __rest(_a, ["className", "variant", "size"]);
    return (_jsx("div", __assign({ className: cn(skeletonVariants({ variant: variant, size: size, className: className })) }, props)));
}
export { Skeleton };
//# sourceMappingURL=skeleton.js.map