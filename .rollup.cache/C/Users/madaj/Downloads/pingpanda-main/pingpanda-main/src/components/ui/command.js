'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
var Command = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive, __assign({ ref: ref, className: cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', className) }, props)));
});
Command.displayName = CommandPrimitive.displayName;
/**
 * Renders a command dialog with custom styling and content.
 */
var CommandDialog = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (_jsx(Dialog, __assign({}, props, { children: _jsx(DialogContent, { className: "overflow-hidden p-0", children: _jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: children }) }) })));
};
var CommandInput = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs("div", { className: "flex items-center border-b px-3", "data-cmdk-input-wrapper": "", children: [_jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), _jsx(CommandPrimitive.Input, __assign({ ref: ref, className: cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', className) }, props))] }));
});
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.List, __assign({ ref: ref, className: cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className) }, props)));
});
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = React.forwardRef(function (props, ref) { return (_jsx(CommandPrimitive.Empty, __assign({ ref: ref, className: "py-6 text-center text-sm text-muted-foreground" }, props))); });
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Group, __assign({ ref: ref, className: cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', className) }, props)));
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, __assign({ ref: ref, className: cn('-mx-1 h-px bg-border', className) }, props)));
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Item, __assign({ ref: ref, className: cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className) }, props)));
});
CommandItem.displayName = CommandPrimitive.Item.displayName;
/**
 * A styled span element with additional props.
 */
var CommandShortcut = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("span", __assign({ className: cn('ml-auto text-xs tracking-widest text-muted-foreground', className) }, props)));
};
CommandShortcut.displayName = 'CommandShortcut';
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
//# sourceMappingURL=command.js.map