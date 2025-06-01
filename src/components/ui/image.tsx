import * as React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = Omit<NextImageProps, 'alt'> & {
  alt: string;
  className?: string;
};

export const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: ImageProps) => {
  if (!src) {
    return null;
  }

  // Set default width and height if not provided
  const defaultSize = 300; // Default size if width/height not provided
  const imgWidth = typeof width === 'number' ? width : defaultSize;
  const imgHeight = typeof height === 'number' ? height : defaultSize;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className="object-cover w-full h-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder={typeof src === 'string' && src.startsWith('/') ? 'blur' : 'empty'}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        {...props}
      />
    </div>
  );
};

// Add display name for better debugging
Image.displayName = 'Image';

export default Image;
