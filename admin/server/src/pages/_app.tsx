// typescript import
import { NextAppContext, DefaultAppIProps } from 'next/app';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

// import
import 'isomorphic-unfetch';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import '@admin/utils/lib/styles/base.less';
import { appWithTranslation } from '@admin/utils/lib/i18n';
import Wrapper from '@admin/wrapper';

import withApollo from '../apollo/withApollo';

// typescript definition
interface PropsType extends DefaultAppIProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

// definition
export class App extends NextApp<PropsType> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: NextAppContext) => ({
    pageProps: Component.getInitialProps ? Component.getInitialProps(ctx) : {},
  });

  public componentDidMount(): void {
    Router.beforePopState(
      ({ as }: { as: string }): boolean => {
        if (!as) window.location.reload();
        return true;
      },
    );
  }

  public render(): React.ReactNode {
    const {
      Component,
      pageProps,
      apolloClient,
      router: { pathname },
    } = this.props;

    return (
      <Container>
        <Head>
          <title>meepShop</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          {/login/.test(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          )}
        </ApolloProvider>
      </Container>
    );
  }
}

export default appWithTranslation(withApollo(App));
