'use client';
import { __assign, __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import styles from './waitlist-widget.module.css';
/**
 * A React component that renders a waitlist widget allowing users to sign up for a waitlist.
 *
 * This component manages user input for email and name, handles form submission, and displays success or error messages using toast notifications.
 * It supports customization through various props such as style options, API key, branding visibility, and more.
 * The component uses React hooks like useState for managing state and useToast for displaying messages.
 *
 * @param {object} _a - Props destructuring.
 * @param {string} _a.waitlistId - The ID of the waitlist to subscribe to.
 * @param {object} [_a.style] - Optional custom styles for the widget.
 * @param {string} [_a.apiKey] - Optional API key for authentication.
 * @param {boolean} [_a.showBranding=true] - Whether to show branding information.
 * @param {string} [_a.className=''] - Additional CSS classes for styling.
 * @returns {JSX.Element} A React element representing the waitlist widget.
 */
export function WaitlistWidget(_a) {
    var _this = this;
    var waitlistId = _a.waitlistId, _b = _a.style, style = _b === void 0 ? {} : _b, apiKey = _a.apiKey, _c = _a.showBranding, showBranding = _c === void 0 ? true : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var _e = useState(''), email = _e[0], setEmail = _e[1];
    var _f = useState(''), name = _f[0], setName = _f[1];
    var _g = useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var toast = useToast().toast;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!email) {
                        toast({
                            title: 'Error',
                            description: 'Email is required',
                            variant: 'destructive',
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    console.log('Widget API Key:', apiKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId, "/subscribers"), {
                            method: 'POST',
                            headers: __assign({ 'Content-Type': 'application/json' }, (apiKey ? { 'Authorization': "Bearer ".concat(apiKey) } : {})),
                            body: JSON.stringify({ email: email, name: name }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.message || 'Failed to join waitlist');
                    }
                    toast({
                        title: 'Success!',
                        description: 'You have been added to the waitlist',
                    });
                    setEmail('');
                    setName('');
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    toast({
                        title: 'Error',
                        description: error_1 instanceof Error ? error_1.message : 'Failed to join waitlist',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Apply default styles
    var _h = style || {}, _j = _h.buttonText, buttonText = _j === void 0 ? 'Join Waitlist' : _j, _k = _h.buttonColor, buttonColor = _k === void 0 ? '' : _k, _l = _h.buttonTextColor, buttonTextColor = _l === void 0 ? '' : _l, _m = _h.backgroundColor, backgroundColor = _m === void 0 ? '' : _m, _o = _h.textColor, textColor = _o === void 0 ? '' : _o, _p = _h.borderRadius, borderRadius = _p === void 0 ? 8 : _p, _q = _h.fontFamily, fontFamily = _q === void 0 ? '' : _q, _r = _h.showLabels, showLabels = _r === void 0 ? true : _r, _s = _h.formLayout, formLayout = _s === void 0 ? 'stacked' : _s;
    // Generate CSS variables for dynamic styling
    var cssVariables = __assign(__assign(__assign(__assign(__assign(__assign({}, (buttonColor && { '--button-bg': buttonColor })), (buttonTextColor && { '--button-text': buttonTextColor })), (textColor && { '--text-color': textColor })), (backgroundColor && { '--bg-color': backgroundColor })), (fontFamily && { '--font-family': fontFamily })), (borderRadius && { '--border-radius': "".concat(borderRadius, "px") }));
    return (_jsxs("div", { className: cn(styles['waitlist-widget'], formLayout === 'inline'
            ? styles['waitlist-widget--inline']
            : styles['waitlist-widget--stacked'], !showLabels && styles['waitlist-widget--no-labels'], className), style: cssVariables, children: [_jsxs("form", { onSubmit: handleSubmit, className: styles['waitlist-widget__form'], children: [_jsxs("div", { className: styles['waitlist-widget__field'], children: [showLabels && (_jsx(Label, { htmlFor: "name", className: styles['waitlist-widget__label'], children: "Name (Optional)" })), _jsx(Input, { id: "name", type: "text", placeholder: "Your name", value: name, onChange: function (e) { return setName(e.target.value); }, disabled: isLoading, className: styles['waitlist-widget__input'] })] }), _jsxs("div", { className: styles['waitlist-widget__field'], children: [showLabels && (_jsx(Label, { htmlFor: "email", className: styles['waitlist-widget__label'], children: "Email *" })), _jsx(Input, { id: "email", type: "email", placeholder: "your@email.com", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true, disabled: isLoading, className: styles['waitlist-widget__input'] })] }), _jsx(Button, { type: "submit", disabled: isLoading, className: styles['waitlist-widget__button'], children: isLoading ? 'Joining...' : buttonText })] }), showBranding && (_jsx("div", { style: { color: 'red', fontWeight: 'bold', fontSize: 20 }, children: "Powered by WaitlistNow" }))] }));
}
//# sourceMappingURL=waitlist-widget.js.map