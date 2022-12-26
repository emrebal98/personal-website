import { Analytics } from '@vercel/analytics/react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import { type ReactElement, type ReactNode } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import '../styles/globals.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
