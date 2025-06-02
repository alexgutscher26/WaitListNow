'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut, } from '@/components/ui/command';
import { useCommandMenu } from '@/hooks/use-command';
import { Command as CommandIcon } from 'lucide-react';
/**
 * Renders a command button that opens a dialog with a list of pages.
 */
export function CommandButton(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = useCommandMenu(), open = _b.open, setOpen = _b.setOpen, pages = _b.pages;
    var _c = useState(false), isMounted = _c[0], setIsMounted = _c[1];
    useEffect(function () {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", size: "sm", className: cn('ml-2 h-9 w-9 p-0 flex items-center justify-center rounded-full border border-input bg-background', className), onClick: function () { return setOpen(true); }, children: [_jsx(CommandIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Open command menu" })] }), _jsxs(CommandDialog, { open: open, onOpenChange: setOpen, children: [_jsx(CommandInput, { placeholder: "Type a command or search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsx(CommandGroup, { heading: "Pages", children: pages.map(function (page) { return (_jsxs(CommandItem, { onSelect: function () {
                                        page.onSelect();
                                        setOpen(false);
                                    }, className: "cursor-pointer", children: [_jsx("span", { className: "mr-2", children: page.icon }), _jsx("span", { children: page.name }), _jsxs(CommandShortcut, { children: ["\u2318", page.shortcut] })] }, page.name)); }) })] })] })] }));
}
//# sourceMappingURL=command-button.js.map