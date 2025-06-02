'use client';
import { __rest } from "tslib";
import React, { useEffect, useState } from 'react';
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
    return (<>
      <Button variant="outline" size="sm" className={cn('ml-2 h-9 w-9 p-0 flex items-center justify-center rounded-full border border-input bg-background', className)} onClick={function () { return setOpen(true); }}>
        <CommandIcon className="h-4 w-4"/>
        <span className="sr-only">Open command menu</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map(function (page) { return (<CommandItem key={page.name} onSelect={function () {
                page.onSelect();
                setOpen(false);
            }} className="cursor-pointer">
                <span className="mr-2">{page.icon}</span>
                <span>{page.name}</span>
                <CommandShortcut>⌘{page.shortcut}</CommandShortcut>
              </CommandItem>); })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>);
}
//# sourceMappingURL=command-button.jsx.map