import { parse } from 'superjson'; // Using named imports for better tree-shaking

/**
 * Parses a JSON string using superjson and returns the parsed value or the original string if parsing fails.
 */
export const parseSuperJSON = (value: string) => {
  try {
    return parse(value);
  } catch {
    return value;
  }
};
