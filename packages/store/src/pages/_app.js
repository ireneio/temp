import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { notification } from 'antd';
import { getUnixTime } from 'date-fns';

import '@store/utils/lib/styles';
import ActionButton from '@meepshop/action-button';
import { appWithTranslation } from '@meepshop/locales';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { RoleProvider } from '@meepshop/context/lib/Role';
import { SensorProvider } from '@meepshop/context/lib/Sensor';
import { CartProvider } from '@meepshop/cart';
import { FormDataProvider } from '@meepshop/form-data';
import { withDomain } from '@meepshop/link';
import withHook from '@store/utils/lib/withHook';
import withApollo from '@store/apollo';
import FbProvider from '@store/fb';
import CurrencyProvider from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import { log } from '@meepshop/logger/lib/gqls/log';

import { CloseView } from 'components';
import Router from 'next/router';
import * as Utils from 'utils';
import {
  appWithCookies,
  getServerSideCookiesContextProps,
  getClientSideCookiesContextProps,
} from 'utils/withCookies';
import usePage from 'hooks/usePage';
import useExpiringPoints from 'hooks/useExpiringPoints';

notification.config({ placement: 'topRight', duration: 1.5 });

Router.onRouteChangeStart = url => {
  if (url !== Router.router.asPath)
    window.storePreviousPageUrl = Router.router.asPath;

  window.storePreviousOffset = window.pageYOffset;
};

Router.onRouteChangeComplete = () => {
  if (window.storeCurrentOffset !== undefined) {
    window.scrollTo(0, window.storeCurrentOffset);
    window.storeCurrentOffset = undefined;
  }
};

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const { req, res } = ctx;
    let pageProps = {};
    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(req);

    if (typeof window === 'undefined') {
      const { valid } = await fetch(
        `${process.env.MEEPSHOP_API}/auth/validate_token`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            token: req.cookies['x-meepshop-authorization-token'],
          }),
        },
      ).then(result => result.json());

      if (!valid) {
        res.cookie('x-meepshop-authorization-token', '', {
          maxAge: 0,
          httpOnly: true,
        });
        delete req.cookies['x-meepshop-authorization-token'];
      }
    }

    const response = await fetch(
      typeof window === 'undefined'
        ? `${process.env.MEEPSHOP_API}/graphql`
        : '/api/graphql',
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
        credentials: typeof window === 'undefined' ? 'include' : 'same-origin',
        body: JSON.stringify({
          query: `
            query checkStore {
              viewer {
                store {
                  adminStatus
                  metaData {
                    storeStatus
                  }
                }
              }
            }
          `,
        }),
      },
    );

    if (response.status < 400) {
      const data = await response.json();
      const storeStatus = data?.data?.viewer.store.metaData.storeStatus;
      const adminStatus = data?.data?.viewer.store.adminStatus;

      /* The store is closed */
      if (storeStatus === 'CLOSE')
        return {
          closed: adminStatus === 'OPEN' ? 'RESTED' : 'CLOSED',
          pageProps,
        };
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
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        XMeepshopDomain,
        userAgent,
      });
    }

    return {
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
  }

  componentDidMount() {
    const { client } = this.props;

    window.history.scrollRestoration = 'manual';
    window.addEventListener('unhandledrejection', event => {
      client.mutate({
        mutation: log,
        variables: {
          input: {
            type: 'ERROR',
            name: 'UNHANDLED_REJECTION',
            data: {
              message: event.reason.message,
              stack: event.reason.stack,
            },
          },
        },
      });
    });

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
    const { client } = this.props;

    client.mutate({
      mutation: log,
      variables: {
        input: {
          type: 'ERROR',
          name: 'RENDER_ERROR',
          data: {
            message: error.message,
            stack: error.stack,
            errorInfo,
          },
        },
      },
    });
  }

  checkSession = () => {
    const expiresAt = window.sessionStorage.getItem('expiresAt');

    if (!expiresAt) return;

    const timestamp = getUnixTime(new Date());

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
      closed,
      Component,
      pageProps,
      router,
      storeName,
      storeDescription,
      logoImage,
      faviconImage,
      backToTopButtonEnabled,
      i18n,
      product,
      page,
      client,
    } = this.props;

    /* Store is closed */
    if (closed) return <CloseView closed={closed} />;

    return (
      <>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="format-detection" content="telephone=no" />

          <title>{storeName}</title>

          <link
            rel="icon"
            type="image/png"
            href={faviconImage?.scaledSrc.w60}
          />
          <link rel="apple-touch-icon" href={faviconImage?.scaledSrc.w60} />

          <meta key="keywords" name="keywords" content={storeName} />
          <meta
            key="description"
            name="description"
            content={storeDescription}
          />

          <meta key="og:type" property="og:type" content="website" />
          <meta
            key="og:url"
            property="og:url"
            content={`https://${router.domain}${router.asPath}`}
          />
          <meta key="og:title" property="og:title" content={storeName} />
          <meta
            key="og:site_name"
            property="og:site_name"
            content={storeName}
          />
          <meta
            key="og:description"
            property="og:description"
            content={storeDescription}
          />
          <meta
            key="og:image"
            property="og:image"
            content={logoImage?.scaledSrc.w240}
          />
          <meta key="og:image:width" property="og:image:width" content="400" />
          <meta
            key="og:image:height"
            property="og:image:height"
            content="300"
          />
          <meta key="og:locale" property="og:locale" content={i18n.language} />
        </Head>
        <EventsProvider>
          <FbProvider>
            <RoleProvider>
              <ColorsProvider>
                <AppsProvider>
                  <SensorProvider>
                    <CurrencyProvider>
                      <AdTrackProvider>
                        <CartProvider>
                          <FormDataProvider>
                            <Component
                              {...pageProps}
                              product={product}
                              page={page}
                              client={client}
                              url={{
                                asPath: router.asPath,
                                query: router.query,
                              }}
                            />

                            <ActionButton
                              backToTopButtonEnabled={backToTopButtonEnabled}
                              goToButton={page?.goToButton || null}
                            />
                          </FormDataProvider>
                        </CartProvider>
                      </AdTrackProvider>
                    </CurrencyProvider>
                  </SensorProvider>
                </AppsProvider>
              </ColorsProvider>
            </RoleProvider>
          </FbProvider>
        </EventsProvider>
      </>
    );
  }
}

export default appWithTranslation(
  withDomain(
    withApollo(
      appWithCookies(withHook(usePage)(withHook(useExpiringPoints)(App))),
    ),
  ),
);
