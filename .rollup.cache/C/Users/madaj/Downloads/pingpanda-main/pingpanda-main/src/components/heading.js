import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/utils';
/**
 * Renders a heading with custom styles and additional props.
 */
export var Heading = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (_jsx("h1", __assign({ className: cn('text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800', className) }, props, { children: children })));
};
//# sourceMappingURL=heading.js.map