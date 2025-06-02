import { parse } from 'superjson'; // Using named imports for better tree-shaking
/**
 * Parses a JSON string using superjson and returns the parsed value or the original string if parsing fails.
 */
export var parseSuperJSON = function (value) {
    try {
        return parse(value);
    }
    catch (_a) {
        return value;
    }
};
//# sourceMappingURL=utils.js.map