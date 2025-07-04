import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

/**
 * Renders a heading with custom styles and additional props.
 */
export const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        'text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
