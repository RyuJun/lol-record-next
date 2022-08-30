import '@/styles/main.scss';

import { Avatar, Dropdown, Link, Navbar, Text } from '@nextui-org/react';
import { DARK_THEME, GLOBAL_STYLES, LIGHT_THEME } from '@/shared/constants';

import { Global } from '@emotion/react';
import { Hydrate } from 'react-query/hydration';
import { I18nextProvider } from 'react-i18next';
import { Layout } from '@/components/Layout/Layout';
import NextApp from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import i18n from '@/locales/i18n';
import queryClient from '@/shared/utils/queryClient';

const App = ({ Component, pageProps }): React.ReactElement => {
  const collapseItems = ['Profile', 'Dashboard', 'Activity', 'Analytics', 'System', 'Deployments', 'My Settings', 'Team Settings', 'Help & Feedback', 'Log Out'];
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <Global styles={GLOBAL_STYLES} />
          <NextThemesProvider defaultTheme="system" attribute="class" value={{ light: LIGHT_THEME.className, dark: DARK_THEME.className }}>
            <NextUIProvider>
              <Layout>
                <Navbar isBordered variant="sticky">
                  <Navbar.Toggle showIn="xs" />
                  <Navbar.Brand
                    css={{
                      '@xs': {
                        w: '12%',
                      },
                    }}
                  >
                    <div className="logoWrapper dark:logo-bg-animate">
                      <svg className="NuxtLogo" width="100%" height="100%" viewBox="0 0 565 140">
                        <text x="30" y="90" fill="rgba(126, 58, 242, var(--bg-opacity)" fontSize="100" fontFamily="'Russo One'">
                          lol-record
                        </text>
                      </svg>
                    </div>
                    {/* <Text b color="inherit" hideIn="xs">
                      ACME
                    </Text> */}
                  </Navbar.Brand>
                  <Navbar.Content enableCursorHighlight activeColor="secondary" hideIn="xs" variant="highlight-rounded">
                    <Navbar.Link href="#">Features</Navbar.Link>
                    <Navbar.Link isActive href="#">
                      Customers
                    </Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Company</Navbar.Link>
                  </Navbar.Content>
                  <Navbar.Content
                    css={{
                      '@xs': {
                        w: '12%',
                        jc: 'flex-end',
                      },
                    }}
                  >
                    <Dropdown placement="bottom-right">
                      <Navbar.Item>
                        <Dropdown.Trigger>
                          <Avatar bordered as="button" color="secondary" size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        </Dropdown.Trigger>
                      </Navbar.Item>
                      <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => console.log({ actionKey })}>
                        <Dropdown.Item key="profile" css={{ height: '$18' }}>
                          <Text b color="inherit" css={{ d: 'flex' }}>
                            Signed in as
                          </Text>
                          <Text b color="inherit" css={{ d: 'flex' }}>
                            zoey@example.com
                          </Text>
                        </Dropdown.Item>
                        <Dropdown.Item key="settings" withDivider>
                          My Settings
                        </Dropdown.Item>
                        <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                        <Dropdown.Item key="analytics" withDivider>
                          Analytics
                        </Dropdown.Item>
                        <Dropdown.Item key="system">System</Dropdown.Item>
                        <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                        <Dropdown.Item key="help_and_feedback" withDivider>
                          Help & Feedback
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" withDivider color="error">
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Navbar.Content>
                  <Navbar.Collapse>
                    {collapseItems.map((item, index) => (
                      <Navbar.CollapseItem
                        key={item}
                        activeColor="secondary"
                        css={{
                          color: index === collapseItems.length - 1 ? '$error' : '',
                        }}
                        isActive={index === 2}
                      >
                        <Link
                          color="inherit"
                          css={{
                            minWidth: '100%',
                          }}
                          href="#"
                        >
                          {item}
                        </Link>
                      </Navbar.CollapseItem>
                    ))}
                  </Navbar.Collapse>
                </Navbar>
              </Layout>

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
