/* eslint-disable no-console */

import 'isomorphic-unfetch';
import '@store/utils/styles/base.less';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import NProgress from 'nprogress';
import { notification } from 'antd';
import moment from 'moment';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { withDomain } from '@meepshop/link';
import withApollo from '@store/apollo';
import FbProvider from '@store/fb';
import CurrencyProvider from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import { Error, CloseView, StoreNotExistsView } from 'components';
import { Router } from 'server/routes';
import * as Utils from 'utils';
import configureStore from 'ducks/store';
import * as Actions from 'ducks/actions';
import withCookies from 'utils/withCookies';

import '../public/nprogress.less';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

notification.config({ placement: 'topRight', duration: 1.5 });

Router.onRouteChangeStart = url => {
  if (url !== Router.router.asPath)
    window.storePreviousPageUrl = Router.router.asPath;

  window.storePreviousOffset = window.pageYOffset;

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
    const { req, res, store } = ctx;
    let pageProps = {};
    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(
      typeof window === 'undefined',
      req,
    );

    try {
      if (typeof window === 'undefined') {
        const { valid } = await fetch(`${API_HOST}/auth/validate_token`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            token: req.cookies['x-meepshop-authorization-token'],
          }),
        }).then(result => result.json());

        if (!valid) {
          res.cookie('x-meepshop-authorization-token', '', {
            maxAge: 0,
            httpOnly: true,
          });
          delete req.cookies['x-meepshop-authorization-token'];
        }
      }

      const response = await fetch(
        typeof window === 'undefined' ? `${API_HOST}/graphql` : '/api/graphql',
        {
          method: 'post',
          headers:
            typeof window === 'undefined'
              ? {
                  'content-type': 'application/json',
                  'x-meepshop-domain': req.headers.host,
                  'x-meepshop-authorization-token':
                    req.cookies['x-meepshop-authorization-token'],
                }
              : { 'content-type': 'application/json' },
          credentials:
            typeof window === 'undefined' ? 'include' : 'same-origin',
          body: JSON.stringify({
            query: `
              query checkStore {
                viewer {
                  store {
                    storeStatus
                  }
                }
              }
            `,
          }),
        },
      );

      if (
        typeof window === 'undefined' &&
        response.status >= 400 &&
        response.status !== 403
      ) {
        console.log(
          `Check >> ${response.status} (${XMeepshopDomain}) ${JSON.stringify(
            req.headers,
          )}`,
        );
      }

      if (response.status < 400) {
        const data = await response.json();
        const storeStatus = data?.data?.viewer.store.storeStatus;

        /* The store is closed */
        if (storeStatus === 0) return { closed: true, pageProps };
      }

      /**
       * If token expired, we remove auth cookie and redirect to the same page
       * to prevent 401 error.
       */
      if (response.status === 401) {
        if (typeof window === 'undefined') {
          res.cookie('x-meepshop-authorization-token', '', {
            maxAge: 0,
            httpOnly: true,
          });
          res.redirect(302, '/');
          return { pageProps };
        }
        const {
          memberReducer: { isLogin },
        } = store.getState();
        if (isLogin === 'ISUSER') {
          store.dispatch(Actions.getAuth());
        }
      }

      /* The store does not exist. */
      if (response.status === 403) return { storeNotFound: true, pageProps };

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({
          ...ctx,
          XMeepshopDomain,
          userAgent,
        });
      }

      return {
        pageProps: {
          ...pageProps,
          namespacesRequired: [
            ...(pageProps.namespacesRequired || []),
            'common',
          ],
        },
      };
    } catch (error) {
      console.log(error);
      if (typeof window !== 'undefined') {
        Utils.logToServer({
          type: 'getInitialProps in _app',
          message: error.message,
          stack: error.stack,
        });
      }
      return { error: { status: 'API_ERROR' }, pageProps };
    }
  }

  componentDidMount() {
    if (!window.meepShopStore.goTo) window.meepShopStore.goTo = Utils.goTo;
    window.history.scrollRestoration = 'manual';
    Router.beforePopState(() => {
      window.storeCurrentOffset = window.storePreviousOffset;
      return true;
    });
    this.checkSession();
  }

  componentDidUpdate() {
    this.checkSession();
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    Utils.logToServer({
      type: 'componentDidCatch',
      message: error.message,
      stack: errorInfo,
    });
  }

  checkSession = () => {
    const expiresAt = window.sessionStorage.getItem('expiresAt');

    if (!expiresAt) return;

    const timestamp = moment().unix();

    if (expiresAt <= timestamp) {
      window.sessionStorage.clear();
      return;
    }

    if (!window.preservedInfoTimer)
      window.preservedInfoTimer = setTimeout(() => {
        window.sessionStorage.clear();
      }, (expiresAt - timestamp) * 1000);
  };

  render() {
    const {
      error,
      closed,
      storeNotFound,
      Component,
      pageProps,
      router,
      store,
    } = this.props;

    /* Hnadle error */
    if (error) return <Error error={error} />;
    /* Store is closed */
    if (closed) return <CloseView />;
    /* Store not found */
    if (storeNotFound) return <StoreNotExistsView />;

    return (
      <>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1.001"
          />
          <meta name="format-detection" content="telephone=no" />
        </Head>

        <EventsProvider>
          <FbProvider>
            <ColorsProvider>
              <AppsProvider>
                <CurrencyProvider>
                  <AdTrackProvider>
                    <Provider store={store}>
                      <Component
                        {...pageProps}
                        url={{
                          asPath: router.asPath,
                          query: router.query,
                        }}
                      />
                    </Provider>
                  </AdTrackProvider>
                </CurrencyProvider>
              </AppsProvider>
            </ColorsProvider>
          </FbProvider>
        </EventsProvider>
      </>
    );
  }
}

export default withApollo(
  withRedux(configureStore)(
    withReduxSaga(appWithTranslation(withCookies(withDomain(MyApp)))),
  ),
);
