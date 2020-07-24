// typescript import
import { AppContext, AppInitialProps } from 'next/app';

// import
import 'isomorphic-unfetch';
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { withDomain } from '@meepshop/link';
import { EventsProvider } from '@meepshop/events';
import '@admin/utils/styles/base.less';
import withApollo from '@admin/apollo';

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
        namespacesRequired: [...(pageProps.namespacesRequired || []), 'common'],
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
          {/login|reset-password/.test(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          )}
        </EventsProvider>
      </>
    );
  }
}

export default withApollo(appWithTranslation(withDomain(App)));
