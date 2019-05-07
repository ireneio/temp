// typescript import
import { NextAppContext, AppProps, DefaultAppIProps } from 'next/app';
import { DefaultQuery } from 'next/router';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { App as NextApp } from '../pages/_app';
import { CustomReq } from './initApollo';

// import
import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import idx from 'idx';

import initApollo from './initApollo';

// typescript definition
interface PropsType extends AppProps, DefaultAppIProps {
  apolloState?: NormalizedCacheObject;
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
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        Head.rewind();
      }

      const apolloState = apollo.extract();

      return {
        Component,
        router,
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
