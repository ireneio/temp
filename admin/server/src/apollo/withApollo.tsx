// typescript import
import { AppContext, AppProps, AppInitialProps } from 'next/app';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { I18nPropsType } from '@admin/utils/lib/i18n';

import { App as NextApp } from '../pages/_app';

// import
import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';

import initApollo from './initApollo';
import initCookies from './initCookies';

// typescript definition
interface PropsType extends AppProps {
  apolloState?: NormalizedCacheObject;
}

export interface CustomCtx extends AppContext {
  ctx: AppContext['ctx'] & {
    req: {
      cookies: {
        'x-meepshop-authorization-token': string;
      };
      i18n: I18nPropsType['i18n'];
      language: I18nPropsType['i18n']['language'];
    };
  };
}

// definition
export default (App: typeof NextApp): React.ComponentType =>
  class WithApollo extends React.Component<PropsType> {
    public static getInitialProps = async (
      ctx: CustomCtx,
    ): Promise<AppInitialProps & Omit<PropsType, keyof AppProps>> => {
      const {
        Component,
        router,
        ctx: { res },
      } = ctx;
      const apollo = initApollo(undefined, ctx.ctx);

      if (!process.browser) {
        try {
          await initCookies(apollo, ctx.ctx);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error while changing language', e);
        }
      }

      const appProps = await App.getInitialProps(ctx);

      if (res?.finished) return appProps;

      if (!process.browser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error while running `getDataFromTree`', e);
        }

        Head.rewind();
      }

      const apolloState = apollo.extract();

      return {
        ...appProps,
        apolloState,
      };
    };

    private apolloClient: ApolloClient<NormalizedCacheObject>;

    public constructor(props: PropsType) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    public render(): React.ReactNode {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
