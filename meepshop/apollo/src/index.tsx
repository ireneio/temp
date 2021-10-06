// typescript import
import { AppProps } from 'next/app';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { NextAppType, NextAppGetInitialPropsType } from '@meepshop/types';
import { LoggerInfoType } from '@meepshop/logger';

import { ContextType, CustomCtxType } from './types';
import { ConfigType as initApolloConfigType } from './utils/initApollo';

// import
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import uuid from 'uuid/v4';

import initialLogger from '@meepshop/logger';

import ApolloNetworkStatusContext, {
  ApolloNetworkStatusProvider,
} from './ApolloNetworkStatus';
import initApollo from './utils/initApollo';
import { shouldIgnoreUnauthorizedError } from './utils/errorLink';

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
}

// definition
export { ContextType, ApolloNetworkStatusContext };

export const buildWithApollo = (config: initApolloConfigType) => (
  App: NextAppType,
): NextAppType => {
  const WithApollo = ({
    apolloState,
    loggerInfo,
    ...props
  }: PropsType): React.ReactElement => (
    <ApolloProvider
      client={initApollo(config, initialLogger(loggerInfo), apolloState)}
    >
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
      ctx: { res },
    } = ctx;
    const loggerInfo =
      typeof window !== 'undefined'
        ? undefined
        : ctx?.ctx.req.loggerInfo || {
            id: uuid(),
            host: ctx?.ctx.req.headers.host,
            userAgent: ctx?.ctx.req.headers['user-agent'],
            url: ctx?.ctx.req.url,
          };
    const client = initApollo(
      config,
      initialLogger(loggerInfo),
      undefined,
      ctx,
    );

    ctx.ctx.client = client;

    const appProps = await App.getInitialProps(ctx);

    if (res?.writableEnded) return appProps;

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

      Head.rewind();
    }

    return {
      ...appProps,
      apolloState: client.extract(),
      loggerInfo,
    };
  };

  return WithApollo;
};

export default buildWithApollo({ name: 'meepshop' });
