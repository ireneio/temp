// typescript import
import { AppProps } from 'next/app';
import { NormalizedCacheObject } from '@apollo/client';

import { NextAppType, NextAppGetInitialPropsType } from '@meepshop/types';
import { LoggerInfoType } from '@meepshop/logger';

import { ContextType, CustomCtxType } from './types';
import { ConfigType as initApolloConfigType } from './utils/initApollo';
import { apolloErrorType } from './utils/errorLink';

// import
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import uuid from 'uuid/v4';
import { serialize } from 'cookie';

import ApolloNetworkStatus from './ApolloNetworkStatus';
import PageError from './PageError';
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
      ctx: { res, req },
    } = ctx;
    const loggerInfo =
      typeof window !== 'undefined'
        ? undefined
        : req.loggerInfo || {
            id: uuid(),
            host: req.headers.host,
            userAgent: req.headers['user-agent'],
            url: req.url,
            identity:
              req.cookies.identity ||
              (() => {
                const identity = uuid();

                req.cookies.identity = identity;
                res.setHeader(
                  'Set-Cookie',
                  serialize('identity', identity, {
                    expires: new Date((2 ** 31 - 1) * 1000),
                  }),
                );

                return identity;
              })(),
          };
    const client = initApollo({ ...config, loggerInfo }, undefined, ctx);
    let appProps: Omit<PropsType, 'Component' | 'router'> = {
      pageProps: { namespacesRequired: ['apollo'] },
      loggerInfo,
    };

    ctx.ctx.client = client;

    try {
      appProps = await App.getInitialProps(ctx);
    } catch (e) {
      return { ...appProps, error: e };
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore FIXME: fix conflict between withReduxSaga and appWithTranslation
    if (appProps.initialProps)
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore FIXME: fix conflict between withReduxSaga and appWithTranslation
      appProps.pageProps = appProps.initialProps.pageProps;

    if (res?.writableEnded) return appProps;

    if (typeof window === 'undefined')
      try {
        const ssrProps = await SSR.getInitialProps(ctx);

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

export default buildWithApollo({ name: 'meepshop' });
