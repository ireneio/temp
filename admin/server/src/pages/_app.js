import 'isomorphic-unfetch';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import '@admin/utils/lib/styles/base.less';
import { appWithTranslation } from '@admin/utils/lib/i18n';
import Wrapper from '@admin/wrapper';

import withApollo from 'apollo/withApollo';

@withApollo
@appWithTranslation
export default class App extends NextApp {
  static getInitialProps = async ({ Component, ctx }) => ({
    pageProps: (await Component.getInitialProps?.(ctx)) || {},
  });

  componentDidMount() {
    Router.beforePopState(({ as }) => {
      if (!as) window.location.reload();

      return true;
    });
  }

  render() {
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
