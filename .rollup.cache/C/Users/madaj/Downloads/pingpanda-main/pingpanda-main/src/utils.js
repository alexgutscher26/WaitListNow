import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merges class names using clsx and tailwind-merge.
 */
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
/**
 * Converts a hexadecimal color string to its integer representation.
 */
export var parseColor = function (color) {
    var hex = color.startsWith('#') ? color.slice(1) : color;
    return parseInt(hex, 16);
};
//# sourceMappingURL=utils.js.map