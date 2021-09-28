// typescript import
import { AppContext, AppInitialProps } from 'next/app';

import { CustomCtx } from '@meepshop/utils/lib/handler';

// import
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { appWithTranslation } from '@meepshop/locales';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { withDomain } from '@meepshop/link';
import handler from '@meepshop/utils/lib/handler';
import Switch from '@meepshop/switch';
import '@admin/utils/styles/base.less';
import withApollo from '@admin/apollo';
import AdTrackProvider from '@admin/ad-track';
import CurrencyProvider from '@admin/currency';

import withCookies from '../utils/withCookies';

// tyepscript definition
interface CustomAppContext extends AppContext {
  ctx: AppContext['ctx'] & CustomCtx;
}

// definition
const Wrapper = dynamic(() => import('@admin/wrapper'));
const NO_WRAPPER = new RegExp(
  [
    'login',
    'sign-up',
    'set-up-store',
    'sign-up-fail',
    'reset-password',
    'smart-conversion-analysis',
    'order/history-records',
  ].join('|'),
);

class App extends NextApp<AppInitialProps> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: CustomAppContext): Promise<AppInitialProps> => {
    await handler(ctx);

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
          <AdTrackProvider>
            <Switch
              isTrue={!NO_WRAPPER.test(pathname)}
              render={children => (
                <AppsProvider>
                  <CurrencyProvider>
                    <Wrapper>{children}</Wrapper>
                  </CurrencyProvider>
                </AppsProvider>
              )}
            >
              <Component {...pageProps} />
            </Switch>
          </AdTrackProvider>
        </EventsProvider>
      </>
    );
  }
}

export default appWithTranslation(withApollo(withCookies(withDomain(App))));
