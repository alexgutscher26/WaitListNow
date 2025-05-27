'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { Search, X, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import * as React from 'react';

// Extend the HTMLAttributes interface to include cmdk-input-wrapper
declare global {
  namespace React {
    interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
      'cmdk-input-wrapper'?: string;
    }
  }
}

import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Enhanced Command with better performance and accessibility
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    loading?: boolean;
    shouldFilter?: boolean;
  }
>(({ className, loading, shouldFilter = true, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    shouldFilter={shouldFilter}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      className,
    )}
    {...props}
  />
));
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
const CommandDialog = ({
  children,
  open,
  onOpenChange,
  showShortcuts = true,
  ...props
}: React.ComponentProps<typeof Command> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showShortcuts?: boolean;
}) => {
  // Handle keyboard shortcuts
  React.useEffect(() => {
    /**
     * Toggles an element's visibility based on keyboard events.
     *
     * This function listens for keyboard events and performs actions based on the key pressed:
     * - If 'k' is pressed with either the metaKey or ctrlKey, it toggles the open state of an element.
     * - If 'Escape' is pressed and the element is currently open, it closes the element.
     */
    const down = (e: KeyboardEvent) => {
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
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <DialogContent
        className="overflow-hidden p-0 shadow-lg max-w-2xl"
        aria-describedby={showShortcuts ? 'command-shortcuts' : undefined}
      >
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
        {showShortcuts && (
          <div
            id="command-shortcuts"
            className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground bg-muted/50 border-t"
          >
            <span>Navigate with ↑↓, select with ↵</span>
            <span>Press Esc to close</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Enhanced CommandInput with clear functionality and loading state
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    loading?: boolean;
    clearable?: boolean;
    onClear?: () => void;
  }
>(({ className, loading, clearable, onClear, value, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState(value || '');

  React.useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleClear = React.useCallback(() => {
    setInputValue('');
    onClear?.();
  }, [onClear]);

  return (
    <div
      className="flex items-center border-b px-3 relative"
      cmdk-input-wrapper=""
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      )}
      <CommandPrimitive.Input
        ref={ref}
        value={inputValue}
        onValueChange={setInputValue}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          'pr-8', // Space for clear button
          className,
        )}
        {...props}
      />
      {clearable && inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 hover:bg-accent rounded-sm transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
});
CommandInput.displayName = CommandPrimitive.Input.displayName;

// Enhanced CommandList with virtualization support hint
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
    maxHeight?: number;
  }
>(({ className, maxHeight = 300, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('overflow-y-auto overflow-x-hidden', className)}
    style={{ maxHeight: `${maxHeight}px` }}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

// Enhanced CommandEmpty with custom content support
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
    children?: React.ReactNode;
  }
>(({ children, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-muted-foreground"
    {...props}
  >
    {children || 'No results found.'}
  </CommandPrimitive.Empty>
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Enhanced CommandGroup with collapsible functionality
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
    collapsible?: boolean;
    defaultCollapsed?: boolean;
  }
>(({ className, heading, collapsible, defaultCollapsed, children, ...props }, ref) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  if (collapsible) {
    return (
      <CommandPrimitive.Group
        ref={ref}
        className={cn('overflow-hidden p-1 text-foreground', className)}
        {...props}
      >
        <button
          className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
        >
          {heading}
          <ArrowDown className={cn('h-3 w-3 transition-transform', collapsed && 'rotate-180')} />
        </button>
        <div className={cn('overflow-hidden transition-all', collapsed && 'h-0')}>{children}</div>
      </CommandPrimitive.Group>
    );
  }

  return (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading}
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  );
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Enhanced CommandShortcut with better styling
/**
 * Renders a styled span element with optional additional props and className.
 */
const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        'bg-muted px-1.5 py-0.5 rounded font-mono',
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

// Enhanced CommandItem with better interaction states
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, 'onSelect'> & {
    shortcut?: string;
    onSelect?: (value: string, event?: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
    description?: string;
  }
>(({ className, children, shortcut, icon, description, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'aria-selected:bg-accent aria-selected:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'hover:bg-accent/50 transition-colors',
      'focus:bg-accent focus:text-accent-foreground',
      className,
    )}
    {...props}
  >
    {icon && <span className="mr-2 flex h-4 w-4 items-center justify-center">{icon}</span>}
    <div className="flex-1">
      <div>{children}</div>
      {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
    </div>
    {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
  </CommandPrimitive.Item>
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// New: CommandLoading component
const CommandLoading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    >
      <Loader2 className="mx-auto h-4 w-4 animate-spin mb-2" />
      Loading...
    </div>
  ),
);
CommandLoading.displayName = 'CommandLoading';

// New: CommandHeader component
const CommandHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center px-3 py-2 border-b', className)}
      {...props}
    />
  ),
);
CommandHeader.displayName = 'CommandHeader';

// New: CommandFooter component
const CommandFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center px-3 py-2 border-t bg-muted/50', className)}
      {...props}
    />
  ),
);
CommandFooter.displayName = 'CommandFooter';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandLoading,
  CommandHeader,
  CommandFooter,
};
