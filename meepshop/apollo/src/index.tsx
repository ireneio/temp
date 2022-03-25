// typescript import
import { AppProps } from 'next/app';
import { NormalizedCacheObject } from '@apollo/client';

import { NextAppType, NextAppGetInitialPropsType } from '@meepshop/types';
import { LoggerInfoType } from '@meepshop/logger';
import PageError from '@meepshop/page-error';

import { ContextType, CustomCtxType } from './constants';
import { ConfigType as initApolloConfigType } from './utils/initApollo';
import { apolloErrorType } from './utils/errorLink';

// import
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { getServerSideLoggerInfo } from '@meepshop/logger';

import ApolloNetworkStatus from './ApolloNetworkStatus';
import SSR from './SSR';
import initApollo, { useApolloNetworkStatus } from './utils/initApollo';

// graphql typescript
import {
  log as logType,
  logVariables,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// typescript definition
interface PropsType extends AppProps {
  apolloState?: NormalizedCacheObject;
  loggerInfo?: LoggerInfoType;
  error?: apolloErrorType;
}

// definition
export { ContextType, useApolloNetworkStatus };

export const buildWithApollo = (
  config: Omit<initApolloConfigType, 'loggerInfo'>,
) => (App: NextAppType): NextAppType => {
  const WithApollo = ({
    apolloState,
    loggerInfo,
    error,
    ...props
  }: PropsType): React.ReactElement => (
    <ApolloProvider client={initApollo({ ...config, loggerInfo }, apolloState)}>
      <ApolloNetworkStatus />

      {error ? (
        <PageError error={error} loggerInfoId={loggerInfo?.id || ''} />
      ) : (
        <App {...props} />
      )}
    </ApolloProvider>
  );

  WithApollo.getInitialProps = async (
    ctx: CustomCtxType,
  ): Promise<NextAppGetInitialPropsType<PropsType>> => {
    const {
      Component,
      router,
      ctx: { req },
    } = ctx;

    // FIXME: T10566, remove after next >= 12
    if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_STORE_DOMAIN)
      req.headers.host = process.env.NEXT_PUBLIC_STORE_DOMAIN;

    const loggerInfo =
      typeof window !== 'undefined'
        ? undefined
        : getServerSideLoggerInfo(ctx.ctx);
    const client = initApollo({ ...config, loggerInfo }, undefined, ctx);
    const ssrProps = await SSR.getInitialProps(ctx);
    let appProps: Omit<PropsType, 'Component' | 'router'> = {
      pageProps: { namespacesRequired: ['apollo'] },
      loggerInfo,
    };

    ctx.ctx.client = client;

    try {
      appProps = await App.getInitialProps(ctx);
    } catch (e) {
      return { ...ssrProps, ...appProps, error: e };
    }

    if (typeof window === 'undefined')
      try {
        await getDataFromTree(
          <ApolloProvider client={client}>
            <SSR {...ssrProps}>
              <App {...appProps} Component={Component} router={router} />
            </SSR>
          </ApolloProvider>,
        );
      } catch (e) {
        if ([401, 403].includes(e.networkError?.statusCode))
          return { ...appProps, error: e };

        client.mutate<logType, logVariables>({
          mutation: log,
          variables: {
            input: {
              type: 'ERROR' as LogTypeEnum,
              name: 'GET_DATA_FROM_TREE' as LogNameEnum,
              data: {
                message: e.message,
                stack: e.stack,
              },
            },
          },
        });
      }

    return {
      ...appProps,
      apolloState: client.extract(),
      loggerInfo,
    };
  };

  return WithApollo;
};
