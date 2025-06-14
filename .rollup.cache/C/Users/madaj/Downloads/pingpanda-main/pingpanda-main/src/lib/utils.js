import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Combines class names using `clsx` and merges them with `twMerge`.
 */
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
//# sourceMappingURL=utils.js.map