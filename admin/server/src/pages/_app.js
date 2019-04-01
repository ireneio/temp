import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App, { Container } from 'next/app';

import withApollo from 'apollo/withApollo';
import Wrapper from '@admin/wrapper';
import { appWithTranslation } from '@admin/utils/lib/i18n';

import { Router } from '../../routes';
import './_app.less';

@withApollo
@appWithTranslation
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    Router.beforePopState(({ as }) => {
      if (!as) window.location.reload();
      return true;
    });
  }

  render() {
    const { Component, pageProps, apolloClient, router } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Wrapper path={router.pathname.split('/')[1]}>
            <Component {...pageProps} />
          </Wrapper>
        </ApolloProvider>
      </Container>
    );
  }
}

export default MyApp;
