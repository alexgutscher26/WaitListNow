import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

/**
 * Renders a layout including a Navbar and child components.
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
