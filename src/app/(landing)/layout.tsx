import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

/**
 * Renders a layout with a Navbar and children components.
 */
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
