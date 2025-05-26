import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and combines class names from input values.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
