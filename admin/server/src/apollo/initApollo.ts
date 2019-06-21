// typescript import
import { NormalizedCacheObject } from 'apollo-boost';
import { NextContext } from 'next';
import { DefaultQuery } from 'next/router';

// import
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import getConfig from 'next/config';
import Router from 'next/router';
import { notification } from 'antd';
import idx from 'idx';

import resolvers, { initializeCache } from '@admin/apollo-client-resolvers';

import shouldPrintError from './shouldPrintError';

// typescript definition
export interface CustomReq {
  cookies?: {
    'x-meepshop-authorization-token': string;
  };
  headers?: {
    host: string;
  };
}

// definition
const {
  publicRuntimeConfig: { API_HOST, VERSION },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  initialState?: NormalizedCacheObject,
  ctx?: NextContext<DefaultQuery, CustomReq>,
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
  }).restore(initialState || {});

  initializeCache(cache);

  return new ApolloClient({
    name: 'admin',
    version: VERSION,
    connectToDevTools: process.browser,
    ssrMode: process.browser,
    cache,
    resolvers,
    link: ApolloLink.from([
      onError(({ response, graphQLErrors, networkError = {} }) => {
        if (
          // @ts-ignore https://github.com/apollographql/apollo-link/issues/536
          networkError.statusCode === 401 &&
          process.browser &&
          window.location.pathname !== '/login'
        ) {
          notification.error({
            message: '請重新登入',
            duration: 1,
            onClose: () => {
              Router.replace('/login');
            },
          });
          return;
        }

        if (graphQLErrors) {
          const errors = graphQLErrors.filter(shouldPrintError);

          if (response && errors.length === 0) {
            response.errors = undefined;
            return;
          }

          errors.forEach(({ message, locations, path }) => {
            const description = `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations,
              null,
              2,
            )}, Path: ${JSON.stringify(path, null, 2)}`;

            if (process.browser)
              notification.error({
                message: 'Error!',
                description,
              });
            else console.error(description);
          });
        }

        if (networkError) {
          if (process.browser)
            notification.error({
              message: 'Error!',
              description: `[Network error]: ${JSON.stringify(
                networkError,
                null,
                2,
              )}`,
            });
          else
            console.error(
              `[Network error]: ${JSON.stringify(networkError, null, 2)}`,
            );
        }
      }),
      new HttpLink({
        uri: process.browser ? '/api/graphql' : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain': idx(ctx, _ => _.req.headers.host),
              'x-meepshop-authorization-token': idx(
                ctx,
                _ => _.req.cookies['x-meepshop-authorization-token'],
              ),
            },
      }),
    ]),
  });
};

export default (
  initialState?: NormalizedCacheObject,
  ctx?: NextContext<DefaultQuery, CustomReq>,
) => {
  if (!process.browser) return create(initialState, ctx);

  if (!apolloClient) apolloClient = create(initialState, ctx);

  return apolloClient;
};
