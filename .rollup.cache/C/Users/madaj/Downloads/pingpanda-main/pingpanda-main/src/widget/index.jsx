var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { WaitlistWidget } from '../components/waitlist-widget';
// Find the current script tag
var currentScript = document.currentScript;
if (currentScript) {
    // Extract data attributes
    var getAttr = function (name, fallback) { return currentScript.getAttribute(name) || fallback; };
    var waitlistId = (_a = getAttr('data-waitlist-id', 'new')) !== null && _a !== void 0 ? _a : 'new';
    // Map data attributes to style object
    var style_1 = {
        buttonText: (_b = getAttr('data-button-text', undefined)) !== null && _b !== void 0 ? _b : undefined,
        buttonColor: (_c = getAttr('data-primary-color', undefined)) !== null && _c !== void 0 ? _c : undefined,
        buttonTextColor: (_d = getAttr('data-button-text-color', undefined)) !== null && _d !== void 0 ? _d : undefined,
        backgroundColor: (_e = getAttr('data-background-color', undefined)) !== null && _e !== void 0 ? _e : undefined,
        textColor: (_f = getAttr('data-text-color', undefined)) !== null && _f !== void 0 ? _f : undefined,
        borderRadius: getAttr('data-button-rounded', undefined) === 'md' ? 8 : getAttr('data-button-rounded', undefined) === 'lg' ? 16 : undefined,
        fontFamily: (_g = getAttr('data-font-family', undefined)) !== null && _g !== void 0 ? _g : undefined,
        showLabels: getAttr('data-show-labels', 'true') === 'true',
        formLayout: (_h = getAttr('data-form-layout', 'stacked')) !== null && _h !== void 0 ? _h : undefined,
    };
    // Remove undefined keys in a type-safe way
    Object.keys(style_1).forEach(function (key) {
        var typedKey = key;
        if (style_1[typedKey] === undefined) {
            delete style_1[typedKey];
        }
    });
    // Create a container div
    var container = document.createElement('div');
    container.id = "waitlist-widget-container-".concat(waitlistId);
    (_j = currentScript.parentNode) === null || _j === void 0 ? void 0 : _j.insertBefore(container, currentScript.nextSibling);
    // Render the widget
    createRoot(container).render(<WaitlistWidget waitlistId={waitlistId} style={style_1}/>);
}
//# sourceMappingURL=index.jsx.map