import 'antd/dist/antd.less';
import React from 'react';
import App, { Container } from 'next/app';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { ApolloProvider } from 'react-apollo';
import NProgress from 'nprogress';
import { notification } from 'antd';

import { Error, CloseView, StoreNotExistsView } from 'components';
import { Router } from 'server/routes';
import * as Utils from 'utils';
import configureStore from 'ducks/store';
import * as Actions from 'ducks/actions';
import withApollo from 'apollo/withApollo';

import '../static/global.less';
import '../static/nprogress.less';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

notification.config({ placement: 'topRight', duration: 1.5 });

Router.onRouteChangeStart = url => {
  // save previous page
  const { pathname, search } = window.location;
  window.storePreviousPageUrl = `${pathname}${search}`;
  window.storePreviousOffset = window.pageYOffset;

  console.log(`Loading: ${url}`);
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  if (window.storeCurrentOffset !== undefined) {
    window.scrollTo(0, window.storeCurrentOffset);
    window.storeCurrentOffset = undefined;
  }
  NProgress.done();
};

Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { isServer, req, res, store } = ctx;
    let pageProps = {};
    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(isServer, req);

    try {
      /**
       * Because we connot get page data when token expired, we need to check
       * 401 error before page navigation. We also
       */
      const response = await fetch(isServer ? `${API_HOST}/graphql` : '/api', {
        method: 'post',
        headers: isServer
          ? {
              'content-type': 'application/json',
              'x-meepshop-domain': req.headers['x-meepshop-domain'],
              'x-meepshop-authorization-token':
                req.headers['x-meepshop-authorization-token'],
            }
          : { 'content-type': 'application/json' },
        credentials: isServer ? 'include' : 'same-origin',
        body: JSON.stringify({
          query: `
            query checkStore {
              getStoreList {
                data {
                  setting {
                    locale
                  }
                }
              }

              viewer {
                store {
                  storeStatus
                }
              }
            }
          `,
        }),
      });

      if (isServer && response.status >= 400 && response.status !== 403) {
        console.log(
          `Check >> ${response.status} (${XMeepshopDomain}) ${JSON.stringify(
            req.headers,
          )}`,
        );
      }

      if (response.status < 400) {
        const data = await response.json();
        const storeStatus = data?.data?.viewer.store.storeStatus;
        const locale =
          req?.locale ||
          data?.data?.getStoreList?.data?.[0]?.setting?.locale?.[0] ||
          'zh_TW';
        /* The store is closed */
        if (storeStatus === 0) return { closed: true, locale };
      }

      /**
       * If token expired, we remove auth cookie and redirect to the same page
       * to prevent 401 error.
       */
      if (response.status === 401) {
        if (isServer) {
          res.setHeader(
            'Set-Cookie',
            `x-meepshop-authorization-token=; path=/; Max-Age=0; HttpOnly`,
          );
          res.writeHead(302, {
            Location: '/',
          });
          res.end();
          return {};
        }
        const {
          memberReducer: { isLogin },
        } = store.getState();
        if (isLogin === 'ISUSER') {
          store.dispatch(Actions.getAuth());
        }
      }

      /* The store does not exist. */
      if (response.status === 403) return { storeNotFound: true };

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({
          ...ctx,
          XMeepshopDomain,
          userAgent,
        });
      }
      return { pageProps };
    } catch (error) {
      console.log(error);
      if (!isServer) {
        Utils.logToServer({
          type: 'getInitialProps in _app',
          message: error.message,
          stack: error.stack,
        });
      }
      return { error: { status: 'API_ERROR' } };
    }
  }

  componentDidMount() {
    if (!window.meepShopStore.goTo) window.meepShopStore.goTo = Utils.goTo;
    window.history.scrollRestoration = 'manual';
    Router.beforePopState(() => {
      window.storeCurrentOffset = window.storePreviousOffset;
      return true;
    });
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    Utils.logToServer({
      type: 'componentDidCatch',
      message: error.message,
      stack: errorInfo,
    });
  }

  render() {
    const {
      error,
      closed,
      locale,
      storeNotFound,
      Component,
      pageProps,
      router,
      apolloClient,
      store,
    } = this.props;

    /* Hnadle error */
    if (error) return <Error error={error} />;
    /* Store is closed */
    if (closed) return <CloseView locale={locale} />;
    /* Store not found */
    if (storeNotFound) return <StoreNotExistsView />;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component
              {...pageProps}
              url={{
                asPath: router.asPath,
                query: router.query,
              }}
            />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(withRedux(configureStore)(withReduxSaga(MyApp)));
