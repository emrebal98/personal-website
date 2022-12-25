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
        {/* Primary Meta Tags */}
        <title>Emre Bal</title>
        <meta name="title" content="Emre Bal" />
        <meta
          name="description"
          content="Personal website of Emre Bal. He is a full stack developer. The technologies he used mostly are Next.js, React, TypeScript."
        />
        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emrebal.com/" />
        <meta property="og:title" content="Emre Bal" />
        <meta
          property="og:description"
          content="Personal website of Emre Bal. He is a full stack developer. The technologies he used mostly are Next.js, React, TypeScript, tRPC, Prisma, MySQL."
        />
        <meta property="og:image" content="https://emrebal.com/meta-image.png" />
        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://emrebal.com/" />
        <meta property="twitter:title" content="Emre Bal" />
        <meta
          property="twitter:description"
          content="Personal website of Emre Bal. He is a full stack developer. The technologies he used mostly are Next.js, React, TypeScript, tRPC, Prisma, MySQL."
        />
        <meta property="twitter:image" content="https://emrebal.com/meta-image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );

  return isHydrated ? (
    page
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <p>Loading...</p>
    </div>
  );
};

export default Layout;
