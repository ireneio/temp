// typescript import
import { AppContext, AppProps } from 'next/app';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import uuid from 'uuid/v4';

import { NextAppType, NextAppGetInitialPropsType } from '@meepshop/types';
import { LoggerInfoType, loggerType } from '@meepshop/logger';

import { ConfigType as initApolloConfigType } from './utils/initApollo';

// import
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import initialLogger from '@meepshop/logger';

import initApollo from './utils/initApollo';
import { shouldIgnoreUnauthorizedError } from './utils/errorLink';
import ApolloNetworkStatusContext, {
  ApolloNetworkStatusProvider,
} from './context/ApolloNetworkStatus';

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

export interface CustomCtxType<Req = {}, Res = {}> extends AppContext {
  ctx: AppContext['ctx'] & {
    client: ApolloClient<NormalizedCacheObject>;
    req: Req & {
      cookies: {
        'x-meepshop-authorization-token': string;
        'merchant-applicant-verify-token': string;
      };
      // FIXME: remove after next-store remove express
      loggerInfo: LoggerInfoType;
      logger: loggerType;
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
    const logger = ctx?.ctx.req.logger || initialLogger(loggerInfo);
    const client = initApollo(config, logger, undefined, ctx);

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
