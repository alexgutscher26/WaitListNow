import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: '',
      circle: 'rounded-full',
    },
    size: {
      default: 'h-4 w-full',
      sm: 'h-2 w-16',
      lg: 'h-8 w-24',
      xl: 'h-10 w-32',
      '2xl': 'h-12 w-40',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

/**
 * Renders a skeleton component with specified styling and properties.
 */
function Skeleton({ className, variant, size, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Skeleton };
