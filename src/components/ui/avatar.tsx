import * as React from 'react';
import { cn } from '@/utils';

const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
  }
>(({ className, src, alt, fallback, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      {src ? (
        <AvatarImage
          src={src}
          alt={alt || ''}
          width={40}
          height={40}
          className="aspect-square h-full w-full"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {fallback}
        </span>
      )}
    </span>
  );
});
Avatar.displayName = 'Avatar';

import Image from 'next/image';

const AvatarImage = React.forwardRef<HTMLImageElement, React.ComponentProps<typeof Image>>(
  ({ className, alt = '', ...props }, ref) => (
    <Image
      ref={ref}
      alt={alt}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  ),
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
