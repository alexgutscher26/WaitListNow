'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command as CommandPrimitive } from 'cmdk';
import { Search, X, ArrowDown, Loader2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
// Enhanced Command with better performance and accessibility
var Command = React.forwardRef(function (_a, ref) {
    var className = _a.className, loading = _a.loading, _b = _a.shouldFilter, shouldFilter = _b === void 0 ? true : _b, props = __rest(_a, ["className", "loading", "shouldFilter"]);
    return (_jsx(CommandPrimitive, __assign({ ref: ref, shouldFilter: shouldFilter, className: cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', 'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2', className) }, props)));
});
Command.displayName = CommandPrimitive.displayName;
// Enhanced CommandDialog with keyboard shortcuts and better UX
/**
 * CommandDialog component that wraps a dialog with command interface.
 *
 * This component manages keyboard shortcuts for opening and closing the dialog,
 * as well as rendering the command interface with optional shortcut instructions.
 * It uses React hooks to handle side effects, specifically adding and removing
 * event listeners for keyboard events. The dialog's open state is controlled
 * by props, and it passes down necessary props to its child components.
 */
var CommandDialog = function (_a) {
    var children = _a.children, open = _a.open, onOpenChange = _a.onOpenChange, _b = _a.showShortcuts, showShortcuts = _b === void 0 ? true : _b, props = __rest(_a, ["children", "open", "onOpenChange", "showShortcuts"]);
    // Handle keyboard shortcuts
    React.useEffect(function () {
        /**
         * Toggles an element's visibility based on keyboard events.
         *
         * This function listens for keyboard events and performs actions based on the key pressed:
         * - If 'k' is pressed with either the metaKey or ctrlKey, it toggles the open state of an element.
         * - If 'Escape' is pressed and the element is currently open, it closes the element.
         */
        var down = function (e) {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
            if (e.key === 'Escape' && open) {
                e.preventDefault();
                onOpenChange(false);
            }
        };
        document.addEventListener('keydown', down);
        return function () { return document.removeEventListener('keydown', down); };
    }, [open, onOpenChange]);
    return (_jsx(Dialog, __assign({ open: open, onOpenChange: onOpenChange }, props, { children: _jsxs(DialogContent, { className: "overflow-hidden p-0 shadow-lg max-w-2xl", "aria-describedby": showShortcuts ? 'command-shortcuts' : undefined, children: [_jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: children }), showShortcuts && (_jsxs("div", { id: "command-shortcuts", className: "flex items-center justify-between px-3 py-2 text-xs text-muted-foreground bg-muted/50 border-t", children: [_jsx("span", { children: "Navigate with \u2191\u2193, select with \u21B5" }), _jsx("span", { children: "Press Esc to close" })] }))] }) })));
};
// Enhanced CommandInput with clear functionality and loading state
var CommandInput = React.forwardRef(function (_a, ref) {
    var className = _a.className, loading = _a.loading, clearable = _a.clearable, onClear = _a.onClear, value = _a.value, props = __rest(_a, ["className", "loading", "clearable", "onClear", "value"]);
    var _b = React.useState(value || ''), inputValue = _b[0], setInputValue = _b[1];
    React.useEffect(function () {
        setInputValue(value || '');
    }, [value]);
    var handleClear = React.useCallback(function () {
        setInputValue('');
        onClear === null || onClear === void 0 ? void 0 : onClear();
    }, [onClear]);
    return (_jsxs("div", { className: "flex items-center border-b px-3 relative", "data-cmdk-input-wrapper": "", children: [loading ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 shrink-0 animate-spin text-muted-foreground" })) : (_jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" })), _jsx(CommandPrimitive.Input, __assign({ ref: ref, value: inputValue, onValueChange: setInputValue, className: cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', 'pr-8', // Space for clear button
                className) }, props)), clearable && inputValue && (_jsx("button", { type: "button", onClick: handleClear, className: "absolute right-3 p-1 hover:bg-accent rounded-sm transition-colors", "aria-label": "Clear search", children: _jsx(X, { className: "h-3 w-3" }) }))] }));
});
CommandInput.displayName = CommandPrimitive.Input.displayName;
// Enhanced CommandList with virtualization support hint
var CommandList = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.maxHeight, maxHeight = _b === void 0 ? 300 : _b, props = __rest(_a, ["className", "maxHeight"]);
    return (_jsx(CommandPrimitive.List, __assign({ ref: ref, className: cn('overflow-y-auto overflow-x-hidden', className), style: { maxHeight: "".concat(maxHeight, "px") } }, props)));
});
CommandList.displayName = CommandPrimitive.List.displayName;
// Enhanced CommandEmpty with custom content support
var CommandEmpty = React.forwardRef(function (_a, ref) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (_jsx(CommandPrimitive.Empty, __assign({ ref: ref, className: "py-6 text-center text-sm text-muted-foreground" }, props, { children: children || 'No results found.' })));
});
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
// Enhanced CommandGroup with collapsible functionality
var CommandGroup = React.forwardRef(function (_a, ref) {
    var className = _a.className, heading = _a.heading, collapsible = _a.collapsible, defaultCollapsed = _a.defaultCollapsed, children = _a.children, props = __rest(_a, ["className", "heading", "collapsible", "defaultCollapsed", "children"]);
    var _b = React.useState(defaultCollapsed), collapsed = _b[0], setCollapsed = _b[1];
    if (collapsible) {
        return (_jsxs(CommandPrimitive.Group, __assign({ ref: ref, className: cn('overflow-hidden p-1 text-foreground', className) }, props, { children: [_jsxs("button", { className: "w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors", onClick: function () { return setCollapsed(!collapsed); }, "aria-expanded": !collapsed, children: [heading, _jsx(ArrowDown, { className: cn('h-3 w-3 transition-transform', collapsed && 'rotate-180') })] }), _jsx("div", { className: cn('overflow-hidden transition-all', collapsed && 'h-0'), children: children })] })));
    }
    return (_jsx(CommandPrimitive.Group, __assign({ ref: ref, heading: heading, className: cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', className) }, props, { children: children })));
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, __assign({ ref: ref, className: cn('-mx-1 h-px bg-border', className) }, props)));
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
// Enhanced CommandShortcut with better styling
/**
 * Renders a styled span element with optional additional props and className.
 */
var CommandShortcut = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("span", __assign({ className: cn('ml-auto text-xs tracking-widest text-muted-foreground', 'bg-muted px-1.5 py-0.5 rounded font-mono', className) }, props)));
};
CommandShortcut.displayName = 'CommandShortcut';
// Enhanced CommandItem with better interaction states
var CommandItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, shortcut = _a.shortcut, icon = _a.icon, description = _a.description, props = __rest(_a, ["className", "children", "shortcut", "icon", "description"]);
    return (_jsxs(CommandPrimitive.Item, __assign({ ref: ref, className: cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none', 'aria-selected:bg-accent aria-selected:text-accent-foreground', 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50', 'hover:bg-accent/50 transition-colors', 'focus:bg-accent focus:text-accent-foreground', className) }, props, { children: [icon && _jsx("span", { className: "mr-2 flex h-4 w-4 items-center justify-center", children: icon }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { children: children }), description && _jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: description })] }), shortcut && _jsx(CommandShortcut, { children: shortcut })] })));
});
CommandItem.displayName = CommandPrimitive.Item.displayName;
// New: CommandLoading component
var CommandLoading = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs("div", __assign({ ref: ref, className: cn('py-6 text-center text-sm text-muted-foreground', className) }, props, { children: [_jsx(Loader2, { className: "mx-auto h-4 w-4 animate-spin mb-2" }), "Loading..."] })));
});
CommandLoading.displayName = 'CommandLoading';
// New: CommandHeader component
var CommandHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ ref: ref, className: cn('flex items-center px-3 py-2 border-b', className) }, props)));
});
CommandHeader.displayName = 'CommandHeader';
// New: CommandFooter component
var CommandFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", __assign({ ref: ref, className: cn('flex items-center px-3 py-2 border-t bg-muted/50', className) }, props)));
});
CommandFooter.displayName = 'CommandFooter';
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, CommandLoading, CommandHeader, CommandFooter, };
//# sourceMappingURL=command-menu.js.map