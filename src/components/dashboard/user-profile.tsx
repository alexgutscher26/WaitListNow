'use client';

import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { CommandButton } from '@/components/command-button';

export function UserProfile() {
  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: 'h-8 w-8',
              },
            }}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">Your Account</p>
            <p className="text-gray-500">Manage profile</p>
          </div>
        </div>
        <CommandButton className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100" />
      </div>

      <div className="mt-4">
        <Link
          href="/sign-out"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="size-5" />
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  );
}
