'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from 'next/link';
import { MaxWidthWrapper } from './max-width-wrapper';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Button, buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
/**
 * Client-side navigation bar component that displays user authentication status and respective links.
 * Uses Clerk's useUser hook to get the current user on the client side.
 */
export var NavbarClient = function () {
    var _a = useUser(), isLoaded = _a.isLoaded, isSignedIn = _a.isSignedIn;
    if (!isLoaded) {
        // You can return a loading state or skeleton here
        return (_jsx("nav", { className: "sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all", children: _jsx(MaxWidthWrapper, { children: _jsxs("div", { className: "flex h-16 items-center justify-between", children: [_jsx("div", { className: "h-8 w-32 bg-gray-200 rounded animate-pulse" }), _jsx("div", { className: "h-8 w-24 bg-gray-200 rounded animate-pulse" })] }) }) }));
    }
    return (_jsx("nav", { className: "sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all", children: _jsx(MaxWidthWrapper, { children: _jsxs("div", { className: "flex h-16 items-center justify-between", children: [_jsxs(Link, { href: "/", className: "flex z-40 font-semibold", children: ["Waitlist", _jsx("span", { className: "text-brand-700", children: "Now" })] }), _jsx("div", { className: "h-full flex items-center space-x-4", children: isSignedIn ? (_jsxs(_Fragment, { children: [_jsx(SignOutButton, { children: _jsx(Button, { size: "sm", variant: "ghost", children: "Sign out" }) }), _jsxs(Link, { href: "/dashboard", className: buttonVariants({
                                        size: 'sm',
                                        className: 'hidden sm:flex items-center gap-1',
                                    }), children: ["Dashboard ", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { href: "/sign-in", className: buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm',
                                    }), children: "Sign in" }), _jsxs(Link, { href: "/sign-up", className: buttonVariants({
                                        size: 'sm',
                                        className: 'hidden sm:flex items-center gap-1',
                                    }), children: ["Get started ", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })) })] }) }) }));
};
//# sourceMappingURL=navbar-client.js.map