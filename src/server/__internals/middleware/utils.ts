import superjson from 'superjson';

/**
 * Parses a JSON string using superjson and returns the parsed value or the original string if parsing fails.
 */
export const parseSuperJSON = (value: string) => {
  try {
    return superjson.parse(value);
  } catch {
    return value;
  }
};
