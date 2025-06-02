import { __rest } from "tslib";
import React from 'react';
import { cn } from '@/utils';
/**
 * Renders a heading with custom styles and additional props.
 */
export var Heading = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (<h1 className={cn('text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800', className)} {...props}>
      {children}
    </h1>);
};
//# sourceMappingURL=heading.jsx.map