'use client';
import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
/**
 * Renders a toaster component displaying toast messages.
 */
export function Toaster() {
    var toasts = useToast().toasts;
    var theme = useTheme().theme;
    return (_jsxs(ToastProvider, { children: [toasts.map(function (_a) {
                var id = _a.id, title = _a.title, description = _a.description, action = _a.action, props = __rest(_a, ["id", "title", "description", "action"]);
                return (_jsxs(Toast, __assign({}, props, { children: [_jsxs("div", { className: "grid gap-1", children: [title && _jsx("div", { className: "font-medium", children: title }), description && _jsx("div", { className: "text-sm opacity-90", children: description })] }), action] }), id));
            }), _jsx(ToastViewport, {})] }));
}
//# sourceMappingURL=toaster.js.map