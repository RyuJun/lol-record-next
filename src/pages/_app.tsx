import { DARK_THEME, GlobalStyles, LIGHT_THEME } from '@/shared/styles/global';
import { Hydrate, QueryClientProvider } from 'react-query';

import { Global } from '@emotion/react';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';
import Layout from '@/components/Layout/Layout';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/configs/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  const env = process.env.NODE_ENV;
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
                  <Component {...pageProps} />
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
