// typescript import
import { NextAppContext, AppProps, DefaultAppIProps } from 'next/app';
import { DefaultQuery } from 'next/router';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { I18nPropsType } from '@admin/utils/lib/i18n';

import { App as NextApp } from '../pages/_app';

// import
import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import idx from 'idx';

import initApollo from './initApollo';
import changeLanguage from './changeLanguage';

// typescript definition
interface PropsType extends AppProps, DefaultAppIProps {
  apolloState?: NormalizedCacheObject;
}

export interface CustomReq {
  headers: {
    host: string;
  };
  cookies: {
    'x-meepshop-authorization-token': string;
    'next-i18next': I18nPropsType['i18n']['language'];
  };
  language: I18nPropsType['i18n']['language'];
  i18n: I18nPropsType['i18n'];
}

// definition
export default (App: typeof NextApp) =>
  class WithApollo extends React.Component<PropsType> {
    public static getInitialProps = async (
      ctx: NextAppContext<DefaultQuery, CustomReq>,
    ) => {
      const {
        Component,
        router,
        ctx: { res },
      } = ctx;
      const apollo = initApollo({}, ctx.ctx);

      if (!process.browser) {
        try {
          await changeLanguage(apollo, ctx.ctx);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error while changing language', e);
        }
      }

      const appProps = await App.getInitialProps(ctx);

      if (idx(res, _ => _.finished)) return {};

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
