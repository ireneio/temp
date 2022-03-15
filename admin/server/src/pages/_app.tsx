// typescript import
import { AppContext, AppInitialProps } from 'next/app';

import { CustomCtx as CookiesCustomCtx } from '@meepshop/cookies';

// import
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import '@admin/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import {
  appWithDomain,
  getServerSideDomainContextProps,
  getClientSideDomainContextProps,
} from '@meepshop/link';
import Switch from '@meepshop/switch';
import withApollo from '@admin/apollo';
import AdTrackProvider from '@admin/ad-track';
import CurrencyProvider from '@admin/currency';

import {
  appWithCookies,
  getServerSideCookiesContextProps,
  getClientSideCookiesContextProps,
} from '../utils/withCookies';

// tyepscript definition
interface CustomAppContext extends AppContext {
  ctx: AppContext['ctx'] & CookiesCustomCtx;
}

// definition
const Wrapper = dynamic(() => import('@admin/wrapper'));

class App extends NextApp<AppInitialProps> {
  public static getInitialProps = async ({
    Component,
    ctx,
    router,
  }: CustomAppContext): Promise<AppInitialProps> => {
    const pageProps: {
      namespacesRequired?: string[];
    } = (await Component.getInitialProps?.(ctx)) || {};

    return {
      ...(typeof window === 'undefined'
        ? getServerSideDomainContextProps(ctx, router)
        : getClientSideDomainContextProps()),
      ...(typeof window === 'undefined'
        ? await getServerSideCookiesContextProps(ctx)
        : await getClientSideCookiesContextProps(ctx)),
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
      pageProps: { noWrapper, ...pageProps },
    } = this.props;

    return (
      <>
        <Head>
          <title>meepShop</title>
          {/* overwrite default viewport meta tag in next.js */}
          <meta name="viewport" content="" />
        </Head>

        <AdTrackProvider>
          <Switch
            isTrue={!noWrapper}
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
      </>
    );
  }
}

export default appWithTranslation(
  appWithDomain(withApollo(appWithCookies(App))),
);
