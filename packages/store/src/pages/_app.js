import React from 'react';
import App, { Container } from 'next/app';
import * as Utils from 'utils';
import * as Actions from 'ducks/actions';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { Router } from 'server/routes';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { notification } from 'antd';
import { Error, CloseView, StoreNotExistsView } from 'components';
import configureStore from 'ducks/store';
import getConfig from 'next/config';
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

  console.log(`Loading: ${url}`);
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { isServer, req, res, store } = ctx;
    let pageProps = {};
    const { XMeepshopDomain, userAgent, cookie = null } = Utils.getReqArgs(
      isServer,
      req,
    );

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
              'x-meepshop-domain': XMeepshopDomain,
              'x-meepshop-authorization-token': Utils.getCookie(
                'x-meepshop-authorization-token',
                cookie,
              ),
            }
          : { 'content-type': 'application/json' },
        credentials: isServer ? 'include' : 'same-origin',
        body: JSON.stringify({
          query: `query checkStore {
        getStoreList {
          data {
            storeStatus
            setting {
              locale
            }
          }
        }
      }`,
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
        const storeStatus = data?.data?.getStoreList?.data?.[0]?.storeStatus;
        const locale =
          Utils.getCookie('locale', cookie) ||
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
          cookie,
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
    /* Hnadle error */
    if (this.props.error) return <Error error={this.props.error} />;
    /* Store is closed */
    if (this.props.closed) return <CloseView locale={this.props.locale} />;
    /* Store not found */
    if (this.props.storeNotFound) return <StoreNotExistsView />;

    const { Component, pageProps, router, store } = this.props;
    const url = { asPath: router.asPath, query: router.query };
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} url={url} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(MyApp));
