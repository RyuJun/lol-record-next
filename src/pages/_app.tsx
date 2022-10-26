import { DARK_THEME, GlobalStyles, LIGHT_THEME } from '@/shared/styles/global';
import { Hydrate, QueryClientProvider } from 'react-query';
import { Loading, NextUIProvider } from '@nextui-org/react';

import { Global } from '@emotion/react';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';
import Layout from '@/components/Layout/Layout';
import { LoadingContainer } from '@/shared/constants/pages';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Router } from 'next/router';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/configs/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  const env = process.env.NODE_ENV;
  const [pageLoading, setPageLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => setPageLoading(true);
    const end = () => setPageLoading(false);
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <Head>
        <title>lol-record</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyles} />
          <Hydrate state={pageProps.dehydratedState}>
            <NextThemesProvider defaultTheme="system" attribute="class" value={{ light: LIGHT_THEME.className, dark: DARK_THEME.className }}>
              <NextUIProvider>
                <Layout>
                  {pageLoading ? (
                    <LoadingContainer>
                      <Loading color="secondary" textColor="secondary" size="xl" />
                    </LoadingContainer>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Layout>
              </NextUIProvider>
            </NextThemesProvider>
          </Hydrate>

          {env === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
