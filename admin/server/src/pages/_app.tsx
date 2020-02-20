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

import '@admin/utils/lib/styles/base.less';
import { appWithTranslation } from '@admin/utils/lib/i18n';
import Wrapper from '@admin/wrapper';

import withApollo from '../apollo/withApollo';

// typescript definition
interface PropsType extends AppInitialProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

// definition
export class App extends NextApp<PropsType> {
  public static getInitialProps = async ({
    Component,
    ctx,
  }: AppContext): Promise<Omit<PropsType, 'apolloClient'>> => {
    const pageProps: {
      namespacesRequired?: string[];
    } = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

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

  public render(): JSX.Element {
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

          {/* <!-- Facebook Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '222744027936443');
          `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=222744027936443&ev=PageView&noscript=1"
            />
          `,
            }}
          />
          {/* <!-- End Facebook Pixel Code --> */}

          {/* <!-- Global site tag (gtag.js) - Google AdWords: 986719315 --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-986719315"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
          {/* <!-- End Global site tag (gtag.js) - Google AdWords: 986719315 --> */}
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
      </>
    );
  }
}

export default withApollo(appWithTranslation(App));
