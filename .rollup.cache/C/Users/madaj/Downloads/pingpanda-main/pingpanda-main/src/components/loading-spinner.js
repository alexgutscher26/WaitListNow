import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
var spinnerVariants = cva('border-4 rounded-full border-brand-200 border-t-brand-700 animate-spin duration-700', {
    variants: {
        size: {
            sm: 'size-4 border-2',
            md: 'size-6 border-4',
            lg: 'size-8 border-4',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
/**
 * Renders a loading spinner with specified size and class name.
 */
export var LoadingSpinner = function (_a) {
    var size = _a.size, className = _a.className;
    return (_jsx("div", { className: "flex justify-center items-center", children: _jsx("div", { className: spinnerVariants({ size: size, className: className }) }) }));
};
//# sourceMappingURL=loading-spinner.js.map