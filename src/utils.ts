import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a color string and returns its integer representation.
 */
export const parseColor = (color: string) => {
  const hex = color.startsWith('#') ? color.slice(1) : color;
  return parseInt(hex, 16);
};
