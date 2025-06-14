'use client';

import { Command as CommandIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { useCommandMenu } from '@/hooks/use-command';
import { cn } from '@/utils';

/**
 * Renders a command button that opens a dialog with a list of pages.
 */
export function CommandButton({ className }: React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, pages } = useCommandMenu();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'ml-2 h-9 w-9 p-0 flex items-center justify-center rounded-full border border-input bg-background',
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <CommandIcon className="h-4 w-4" />
        <span className="sr-only">Open command menu</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.name}
                onSelect={() => {
                  page.onSelect();
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <span className="mr-2">{page.icon}</span>
                <span>{page.name}</span>
                <CommandShortcut>⌘{page.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
