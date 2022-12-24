import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
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

  const page = (
    <>
      <Head>
        <title>Emre Bal</title>
        <meta name="description" content="Personal website of Emre Bal." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );

  return isHydrated ? page : <div>Loading...</div>;
};

export default Layout;
