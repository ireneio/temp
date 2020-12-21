// typescript import
import { AppContext, AppProps } from 'next/app';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import {
  NextAppType,
  NextAppGetInitialPropsType,
} from '@meepshop/utils/lib/types';

import { ConfigType as initApolloConfigType } from './utils/initApollo';

// import
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import initApollo from './utils/initApollo';
import { shouldIgnoreUnauthorizedError } from './utils/errorLink';
import ApolloNetworkStatusContext, {
  ApolloNetworkStatusProvider,
} from './context/ApolloNetworkStatus';

// typescript definition
interface PropsType extends AppProps {
  apolloState?: NormalizedCacheObject;
}

export interface CustomCtxType<Req = {}, Res = {}> extends AppContext {
  ctx: AppContext['ctx'] & {
    client: ApolloClient<NormalizedCacheObject>;
    req: Req & {
      logId: string;
      cookies: {
        'x-meepshop-authorization-token': string;
        'merchant-applicant-verify-token': string;
      };
    };
    res: Res;
  };
}

export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}

// definition
export { ApolloNetworkStatusContext };

export const buildWithApollo = (config: initApolloConfigType) => (
  App: NextAppType,
): NextAppType => {
  const WithApollo = ({
    apolloState,
    ...props
  }: PropsType): React.ReactElement => (
    <ApolloProvider client={initApollo(config, apolloState)}>
      <ApolloNetworkStatusProvider>
        <App {...props} />
      </ApolloNetworkStatusProvider>
    </ApolloProvider>
  );

  WithApollo.getInitialProps = async (
    ctx: CustomCtxType,
  ): Promise<NextAppGetInitialPropsType<PropsType>> => {
    const {
      Component,
      router,
      ctx: { res, req },
    } = ctx;
    const client = initApollo(config, undefined, ctx);

    ctx.ctx.client = client;

    const appProps = await App.getInitialProps(ctx);

    if (res?.finished) return appProps;

    if (typeof window === 'undefined') {
      try {
        await getDataFromTree(
          <ApolloProvider client={client}>
            <ApolloNetworkStatusProvider>
              <App {...appProps} Component={Component} router={router} />
            </ApolloNetworkStatusProvider>
          </ApolloProvider>,
        );
      } catch (e) {
        if (!shouldIgnoreUnauthorizedError(e.networkError))
          // eslint-disable-next-line no-console
          console.error(req.logId, 'Error while running `getDataFromTree`', e);
      }

      Head.rewind();
    }

    return {
      ...appProps,
      apolloState: client.extract(),
    };
  };

  return WithApollo;
};

export default buildWithApollo({ name: 'meepshop' });
