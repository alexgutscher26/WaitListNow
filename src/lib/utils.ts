import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and merges them with `twMerge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes input for safe console logging. Handles errors, objects, and primitives.
 * - Errors: returns message, name, and stack only.
 * - Objects: safely stringifies, truncates long output.
 * - Primitives: returns as is.
 */
export function sanitizeForConsole(input: unknown): string {
  if (input instanceof Error) {
    return JSON.stringify({
      name: input.name,
      message: input.message,
      stack: input.stack?.split('\n').slice(0, 3).join(' | '),
    });
  }
  if (typeof input === 'object' && input !== null) {
    try {
      const str = JSON.stringify(input, (key, value) => {
        // Mask likely sensitive fields
        if (typeof key === 'string' && /password|token|secret|key/i.test(key)) {
          return '[REDACTED]';
        }
        return value;
      });
      return str.length > 500 ? str.slice(0, 500) + '... [truncated]' : str;
    } catch {
      return '[Unserializable object]';
    }
  }
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return String(input);
  }
  return '[Unknown value]';
}
