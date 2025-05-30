import { ReactNode } from 'react';
import { NavbarClient } from '@/components/navbar-client';

/**
 * Renders a layout containing a Navbar and its child components.
 */
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarClient />
      {children}
    </>
  );
};

export default Layout;
