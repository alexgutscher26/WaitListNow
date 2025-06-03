'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
/**
 * Manages the state and behavior of a command menu within an application.
 *
 * This function initializes a React hook to toggle the visibility of the command menu
 * when specific keyboard shortcuts (⌘K or Ctrl+K) are pressed. It also defines the
 * pages and actions available within the menu, each associated with a route navigation
 * using the router object. The function returns the state of the menu's open/closed
 * status, a setter for this state, and the list of defined pages.
 */
export function useCommandMenu() {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var router = useRouter();
    // Toggle the menu when ⌘K or Ctrl+K is pressed
    useEffect(function () {
        /**
         * Toggles the open state when 'k' is pressed with metaKey or ctrlKey.
         *
         * This function handles keyboard events, checking if the key 'k' is pressed alongside either
         * the metaKey (on macOS) or ctrlKey (on Windows/Linux). If so, it prevents the default event
         * behavior and toggles the open state using the setOpen function.
         *
         * @param e - The KeyboardEvent object representing the keyboard input.
         */
        var down = function (e) {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === 'k' && e.ctrlKey)) {
                e.preventDefault();
                setOpen(function (open) { return !open; });
            }
        };
        document.addEventListener('keydown', down);
        return function () { return document.removeEventListener('keydown', down); };
    }, []);
    // Define the command menu pages and actions
    var pages = [
        {
            name: 'Dashboard',
            shortcut: 'D',
            onSelect: function () { return router.push('/dashboard'); },
            icon: '🏠',
        },
        {
            name: 'Waitlists',
            shortcut: 'W',
            onSelect: function () { return router.push('/dashboard/waitlists'); },
            icon: '👥',
        },
        {
            name: 'API Key',
            shortcut: 'A',
            onSelect: function () { return router.push('/dashboard/api-key'); },
            icon: '🔑',
        },
        {
            name: 'Account Settings',
            shortcut: 'S',
            onSelect: function () { return router.push('/dashboard/account-settings'); },
            icon: '⚙️',
        },
        {
            name: 'Upgrade',
            shortcut: 'U',
            onSelect: function () { return router.push('/dashboard/upgrade'); },
            icon: '💎',
        },
    ];
    return {
        open: open,
        setOpen: setOpen,
        pages: pages,
    };
}
//# sourceMappingURL=use-command.js.map