/* eslint-disable import/no-default-export */
'use client';

import {
  Gem,
  Home,
  Key,
  LucideIcon,
  Menu,
  Settings,
  Users,
  X,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { CommandButton } from '@/components/command-button';
import { UserProfile } from '@/components/dashboard/user-profile';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/utils';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  text: string;
  external?: boolean;
}

interface SidebarCategoryProps {
  category: string;
  items: SidebarItemProps[];
}

const SIDEBAR_ITEMS: SidebarCategoryProps[] = [
  {
    category: 'Overview',
    items: [
      {
        href: '/dashboard',
        icon: Home,
        text: 'Dashboard',
      },
    ],
  },
  {
    category: 'Waitlists',
    items: [
      {
        href: '/dashboard/waitlists',
        icon: Users,
        text: 'All Waitlists',
      },
    ],
  },
  {
    category: 'Account',
    items: [
      {
        href: '/dashboard/upgrade',
        icon: Gem,
        text: 'Upgrade',
        external: false,
      },
    ],
  },
  {
    category: 'Settings',
    items: [
      {
        href: '/dashboard/api-key',
        icon: Key,
        text: 'API Key',
      },
      {
        href: '/dashboard/account-settings',
        icon: Settings,
        text: 'Account Settings',
      },
    ],
  },
];

/**
 * Renders a sidebar component with navigation items and user profile information.
 *
 * The component uses the `usePathname` hook to determine the active pathname
 * and highlights the corresponding navigation item. It maps over predefined sidebar items
 * to generate navigation links, handling both internal and external links.
 * The user section includes an account button and a sign-out link.
 */
const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  /**
   * Checks if the given href matches or starts with the current pathname.
   */
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="hidden sm:flex items-center gap-2 group"
        onClick={onClose}
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
          Waitlist<span className="font-bold">Now</span>
        </span>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-1">
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li
              key={category}
              className="mb-6 last:mb-0"
            >
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 px-2 mb-2">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <li key={`${category}-${i}`}>
                      <Link
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          active
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                        )}
                        onClick={onClose}
                      >
                        <item.icon
                          className={cn(
                            'size-5',
                            active ? 'text-brand-600' : 'text-gray-500 group-hover:text-gray-700',
                          )}
                        />
                        <span>{item.text}</span>
                        {item.external && (
                          <span className="ml-auto">
                            <ArrowUpRight className="size-3.5 text-gray-400" />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <UserProfile />
    </div>
  );
};

/**
 * Layout component that renders a responsive layout with a sidebar and main content area.
 * The layout adjusts based on the screen size and path, showing different elements for desktop and mobile views.
 *
 * @param children - React children to be rendered within the main content area.
 */
const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Only show the mobile header on the dashboard page
  const showMobileHeader = pathname === '/dashboard';

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 lg:w-72 border-r border-gray-200 bg-white p-4 lg:p-6 flex flex-col h-full">
          <Sidebar />
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Mobile Header */}
        {showMobileHeader && (
          <header className="md:hidden flex items-center justify-between px-4 h-16 border-b border-gray-200 bg-white">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/dashboard"
              className="flex items-center"
            >
              <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Waitlist<span className="font-bold">Now</span>
              </span>
            </Link>
            <div className="w-9">
              <CommandButton className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100" />
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20">
          <div className="flex justify-around">
            {SIDEBAR_ITEMS.flatMap((category) => category.items)
              .filter((item) => item.href !== '/dashboard/upgrade') // Exclude upgrade from mobile nav
              .map((item, i) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      'flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium',
                      active ? 'text-brand-600 bg-brand-50' : 'text-gray-500 hover:text-gray-700',
                    )}
                  >
                    <item.icon
                      className={cn('h-5 w-5 mb-1', active ? 'text-brand-600' : 'text-gray-400')}
                    />
                    <span>{item.text}</span>
                  </Link>
                );
              })}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Modal
        className="p-0 w-full max-w-xs sm:max-w-md"
        showModal={isDrawerOpen}
        setShowModal={setIsDrawerOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Sidebar onClose={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
