import { type FunctionComponent, useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : <div>Loading...</div>;
};

export default Layout;
