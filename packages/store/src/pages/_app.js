import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { notification } from 'antd';
import { getUnixTime } from 'date-fns';

import '@store/utils/lib/styles';
import ActionButton from '@meepshop/action-button';
import { appWithTranslation } from '@meepshop/locales';
import { ColorsProvider } from '@meepshop/context/lib/Colors';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { RoleProvider } from '@meepshop/context/lib/Role';
import { SensorProvider } from '@meepshop/context/lib/Sensor';
import { FormDataProvider } from '@meepshop/form-data';
import { appWithDomain } from '@meepshop/link';
import withHook from '@store/utils/lib/withHook';
import withApollo from '@store/apollo';
import FbProvider from '@store/fb';
import CurrencyProvider from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import { log } from '@meepshop/logger/lib/gqls/log';

import { CloseView } from 'components';
import getClientSideProps from 'utils/getClientSideProps';
import getServerSideProps from 'utils/getServerSideProps';
import { appWithCookies } from 'utils/withCookies';
import useInitialCart from 'hooks/useInitialCart';
import usePage from 'hooks/usePage';
import useExpiringPoints from 'hooks/useExpiringPoints';
import useQueryString from 'hooks/useQueryString';

notification.config({ placement: 'topRight', duration: 1.5 });

class App extends NextApp {
  static async getInitialProps({ Component, ctx, router }) {
    const initialProps =
      typeof window === 'undefined'
        ? await getServerSideProps(ctx, router)
        : await getClientSideProps(ctx);

    if (initialProps.closed) return initialProps;

    const pageProps =
      (await Component.getInitialProps?.({
        ...ctx,
      })) || {};

    return {
      ...initialProps,
      pageProps: {
        ...pageProps,
        userAgent:
          typeof window === 'undefined'
            ? ctx.req.get?.('user-agent')
            : window.navigator.userAgent,
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
      loading,
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

        <FbProvider>
          <RoleProvider>
            <ColorsProvider>
              <AppsProvider>
                <SensorProvider>
                  <CurrencyProvider>
                    <AdTrackProvider>
                      <FormDataProvider>
                        <Component
                          {...pageProps}
                          product={product}
                          loading={loading}
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
                    </AdTrackProvider>
                  </CurrencyProvider>
                </SensorProvider>
              </AppsProvider>
            </ColorsProvider>
          </RoleProvider>
        </FbProvider>
      </>
    );
  }
}

export default appWithTranslation(
  appWithDomain(
    withApollo(
      appWithCookies(
        withHook(useQueryString)(
          withHook(useInitialCart)(
            withHook(usePage)(withHook(useExpiringPoints)(App)),
          ),
        ),
      ),
    ),
  ),
);
