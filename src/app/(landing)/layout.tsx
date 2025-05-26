import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

/**
 * Renders a layout containing a Navbar and its child components.
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
