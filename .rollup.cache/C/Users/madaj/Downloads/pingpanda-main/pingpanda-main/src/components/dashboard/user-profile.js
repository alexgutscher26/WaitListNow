'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { CommandButton } from '@/components/command-button';
export function UserProfile() {
    return (_jsxs("div", { className: "border-t border-gray-100 pt-4", children: [_jsxs("div", { className: "flex items-center justify-between px-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(UserButton, { afterSignOutUrl: "/", appearance: {
                                    elements: {
                                        userButtonAvatarBox: 'h-8 w-8',
                                    },
                                } }), _jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Your Account" }), _jsx("p", { className: "text-gray-500", children: "Manage profile" })] })] }), _jsx(CommandButton, { className: "text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100" })] }), _jsx("div", { className: "mt-4", children: _jsxs(Link, { href: "/sign-out", className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100", children: [_jsx(LogOut, { className: "size-5" }), _jsx("span", { children: "Sign out" })] }) })] }));
}
//# sourceMappingURL=user-profile.js.map