'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { Heading } from './heading';
import { useRouter } from 'next/navigation';
/**
 * Renders a dashboard page with optional navigation and CTA button.
 */
export var DashboardPage = function (_a) {
    var title = _a.title, description = _a.description, children = _a.children, cta = _a.cta, actions = _a.actions, hideBackButton = _a.hideBackButton;
    var router = useRouter();
    return (_jsxs("section", { className: "flex-1 h-full w-full flex flex-col", children: [_jsx("div", { className: "w-full p-6 sm:p-8 flex justify-between border-b border-gray-200", children: _jsxs("div", { className: "w-full flex flex-col sm:flex-row items-start sm:items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-8", children: [hideBackButton ? null : (_jsx(Button, { onClick: function () { return router.push('/dashboard'); }, className: "w-fit bg-white", variant: "outline", children: _jsx(ArrowLeft, { className: "size-4" }) })), _jsxs("div", { className: "flex flex-col", children: [_jsx(Heading, { children: title }), description && _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [actions, cta] })] }) }), _jsx("div", { className: "flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto", children: children })] }));
};
//# sourceMappingURL=dashboard-page.js.map