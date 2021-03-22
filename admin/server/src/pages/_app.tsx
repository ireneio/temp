// typescript import
import { AppContext, AppInitialProps } from 'next/app';

// import
import 'isomorphic-unfetch';
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { appWithTranslation } from '@meepshop/locales';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { withDomain } from '@meepshop/link';
import '@admin/utils/styles/base.less';
import withApollo from '@admin/apollo';
import AdTrackProvider from '@admin/ad-track';
import CurrencyProvider from '@admin/currency';

import withCookies from '../utils/withCookies';

// definition
const Wrapper = dynamic(() => import('@admin/wrapper'));

class App extends NextApp<AppInitialProps> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> => {
    const pageProps: {
      namespacesRequired?: string[];
    } = (await Component.getInitialProps?.(ctx)) || {};

    return {
      pageProps: {
        ...pageProps,
        namespacesRequired: [
          ...(pageProps.namespacesRequired || []),
          '@meepshop/locales/namespacesRequired',
        ],
      },
    };
  };

  public componentDidMount(): void {
    Router.beforePopState(({ as }: { as: string }): boolean => {
      if (!as) window.location.reload();

      return true;
    });
  }

  public render(): React.ReactElement {
    const {
      Component,
      pageProps,
      router: { pathname },
    } = this.props;

    return (
      <>
        <Head>
          <title>meepShop</title>
          {/* overwrite default viewport meta tag in next.js */}
          <meta name="viewport" content="" />
        </Head>

        <EventsProvider>
          {/login|sign-up|set-up-store|sign-up-fail|reset-password|smart-conversion-analysis/.test(
            pathname,
          ) ? (
            <AdTrackProvider>
              <Component {...pageProps} />
            </AdTrackProvider>
          ) : (
            <AppsProvider>
              <CurrencyProvider>
                <AdTrackProvider>
                  <Wrapper>
                    <Component {...pageProps} />
                  </Wrapper>
                </AdTrackProvider>
              </CurrencyProvider>
            </AppsProvider>
          )}
        </EventsProvider>
      </>
    );
  }
}

export default withApollo(appWithTranslation(withCookies(withDomain(App))));
