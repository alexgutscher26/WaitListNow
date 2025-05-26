import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils';

// Card Component
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

// CardHeader Component
/**
 * Renders a card header with optional custom class name and props.
 */
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);

// CardTitle Component
/**
 * Renders a styled h3 element with optional additional props and children.
 */
export const CardTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
);

// CardDescription Component
/**
 * Renders a paragraph element with default styling and additional props.
 */
export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

// CardContent Component
/**
 * Renders a content div with padding and optional custom classes.
 */
export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('p-6 pt-0', className)}
    {...props}
  />
);

// CardFooter Component
/**
 * Renders a card footer with optional custom classes and props.
 */
export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
);
