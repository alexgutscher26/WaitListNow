'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils';
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(TabsPrimitive.List, __assign({ ref: ref, className: cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', className) }, props)));
});
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(TabsPrimitive.Trigger, __assign({ ref: ref, className: cn('inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow', className) }, props)));
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(TabsPrimitive.Content, __assign({ ref: ref, className: cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className) }, props)));
});
TabsContent.displayName = TabsPrimitive.Content.displayName;
export { Tabs, TabsList, TabsTrigger, TabsContent };
//# sourceMappingURL=tabs.js.map