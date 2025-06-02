import { __rest } from "tslib";
import React, { forwardRef } from 'react';
import { cn } from '@/utils';
// Card Component
export var Card = forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={cn('relative rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props}/>);
});
Card.displayName = 'Card';
// CardHeader Component
/**
 * Renders a card header with optional custom class name and additional props.
 */
export var CardHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}/>);
};
// CardTitle Component
/**
 * Renders a styled h3 element with optional additional props and children.
 */
export var CardTitle = function (_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (<h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>);
};
// CardDescription Component
/**
 * Renders a paragraph element with default styling and additional props.
 */
export var CardDescription = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<p className={cn('text-sm text-muted-foreground', className)} {...props}/>);
};
// CardContent Component
/**
 * Renders a content div with padding and optional custom classes.
 */
export var CardContent = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('p-6 pt-0', className)} {...props}/>);
};
// CardFooter Component
/**
 * Renders a card footer with optional custom classes and props.
 */
export var CardFooter = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('flex items-center p-6 pt-0', className)} {...props}/>);
};
//# sourceMappingURL=card.jsx.map