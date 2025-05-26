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
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    /**
     * Toggles the open state when 'k' is pressed with metaKey or ctrlKey.
     *
     * This function listens to keyboard events and checks if the key 'k' is pressed along with either
     * the metaKey (on macOS) or ctrlKey (on Windows/Linux). If the condition is met, it prevents the
     * default event behavior and toggles the open state using the setOpen function.
     *
     * @param e - The KeyboardEvent object representing the keyboard input.
     */
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === 'k' && e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Define the command menu pages and actions
  const pages = [
    {
      name: 'Dashboard',
      shortcut: 'D',
      onSelect: () => router.push('/dashboard'),
      icon: '🏠',
    },
    {
      name: 'Waitlists',
      shortcut: 'W',
      onSelect: () => router.push('/dashboard/waitlists'),
      icon: '👥',
    },
    {
      name: 'API Key',
      shortcut: 'A',
      onSelect: () => router.push('/dashboard/api-key'),
      icon: '🔑',
    },
    {
      name: 'Account Settings',
      shortcut: 'S',
      onSelect: () => router.push('/dashboard/account-settings'),
      icon: '⚙️',
    },
    {
      name: 'Upgrade',
      shortcut: 'U',
      onSelect: () => router.push('/dashboard/upgrade'),
      icon: '💎',
    },
  ];

  return {
    open,
    setOpen,
    pages,
  };
}
