import '@/styles/main.scss';

import { DARK_THEME, GLOBAL_STYLES, LIGHT_THEME } from '@/shared/constants';

import { Global } from '@emotion/react';
import { Hydrate } from 'react-query/hydration';
import { I18nextProvider } from 'react-i18next';
import NextApp from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/utils/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <Global styles={GLOBAL_STYLES} />
          <NextThemesProvider defaultTheme="system" attribute="class" value={{ light: LIGHT_THEME.className, dark: DARK_THEME.className }}>
            <NextUIProvider>
              <Component {...pageProps} />
            </NextUIProvider>
          </NextThemesProvider>
        </Hydrate>
        {process.env.NODE_ENV === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </I18nextProvider>
  );
};

App.getInitialProps = async (props) => {
  const appProps = await NextApp.getInitialProps(props);
  if (props.Component && props.Component.getInitialProps) appProps.pageProps = await props.Component.getInitialProps(props.ctx);
  return appProps;
};

export default App;
