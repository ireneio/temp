// typescript import
import { AppContext, AppInitialProps } from 'next/app';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

// import
import 'isomorphic-unfetch';
import React from 'react';
import { ApolloProvider } from '@apollo/react-components';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/events';
import '@admin/utils/lib/styles/base.less';

import withApollo from '../apollo/withApollo';

// typescript definition
interface PropsType extends AppInitialProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

// definition
const Wrapper = dynamic(() => import('@admin/wrapper'));

class App extends NextApp<PropsType> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: AppContext): Promise<Omit<PropsType, 'apolloClient'>> => {
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
      apolloClient,
      router: { pathname },
    } = this.props;

    return (
      <>
        <Head>
          <title>meepShop</title>
          {/* overwrite default viewport meta tag in next.js */}
          <meta name="viewport" content="" />
        </Head>

        <ApolloProvider client={apolloClient}>
          <EventsProvider>
            {/login|reset-password/.test(pathname) ? (
              <Component {...pageProps} />
            ) : (
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            )}
          </EventsProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(appWithTranslation(App));
