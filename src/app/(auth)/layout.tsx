import * as React from 'react';
import { ReactNode } from 'react';
import { NavbarClient } from '@/components/navbar-client';

/**
 * Renders a layout including a Navbar and child components.
 */
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarClient />
      {children}
    </>
  );
};

export { Layout };
