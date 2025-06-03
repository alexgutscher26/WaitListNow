import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils';
var Avatar = React.forwardRef(function (_a, ref) {
    var className = _a.className, src = _a.src, alt = _a.alt, fallback = _a.fallback, props = __rest(_a, ["className", "src", "alt", "fallback"]);
    return (_jsx("span", __assign({ ref: ref, className: cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className) }, props, { children: src ? (_jsx(AvatarImage, { src: src, alt: alt || '', width: 40, height: 40, className: "aspect-square h-full w-full" })) : (_jsx("span", { className: "flex h-full w-full items-center justify-center rounded-full bg-muted", children: fallback })) })));
});
Avatar.displayName = 'Avatar';
import Image from 'next/image';
var AvatarImage = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.alt, alt = _b === void 0 ? '' : _b, props = __rest(_a, ["className", "alt"]);
    return (_jsx(Image, __assign({ ref: ref, alt: alt, className: cn('aspect-square h-full w-full', className) }, props)));
});
AvatarImage.displayName = 'AvatarImage';
var AvatarFallback = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("span", __assign({ ref: ref, className: cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className) }, props)));
});
AvatarFallback.displayName = 'AvatarFallback';
export { Avatar, AvatarImage, AvatarFallback };
//# sourceMappingURL=avatar.js.map