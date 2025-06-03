import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import NextImage from 'next/image';
export var Image = function (_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, _b = _a.className, className = _b === void 0 ? '' : _b, props = __rest(_a, ["src", "alt", "width", "height", "className"]);
    if (!src) {
        return null;
    }
    // Set default width and height if not provided
    var defaultSize = 300; // Default size if width/height not provided
    var imgWidth = typeof width === 'number' ? width : defaultSize;
    var imgHeight = typeof height === 'number' ? height : defaultSize;
    return (_jsx("div", { className: "relative overflow-hidden ".concat(className), children: _jsx(NextImage, __assign({ src: src, alt: alt, width: imgWidth, height: imgHeight, className: "object-cover w-full h-auto", sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", placeholder: typeof src === 'string' && src.startsWith('/') ? 'blur' : 'empty', blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" }, props)) }));
};
// Add display name for better debugging
Image.displayName = 'Image';
export default Image;
//# sourceMappingURL=image.js.map