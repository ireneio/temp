// typescript import
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { CustomCtx } from './withApollo';

// import
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import getConfig from 'next/config';
import Router from 'next/router';
import { notification } from 'antd';

import resolvers, {
  initializeCache,
  introspectionQueryResultDataType,
} from '@admin/apollo';

import shouldPrintError from './shouldPrintError';

// definition
const {
  publicRuntimeConfig: { API_HOST, VERSION },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtx['ctx'],
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: introspectionQueryResultDataType,
        },
      },
    }),
  }).restore(initialState || {});

  if (!initialState) initializeCache(cache, ctx);

  return new ApolloClient({
    name: 'admin',
    version: VERSION,
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache,
    resolvers,
    link: ApolloLink.from([
      onError(({ response, graphQLErrors, networkError = {} }) => {
        if (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
            // eslint-disable-next-line no-console
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
          else {
            // eslint-disable-next-line no-console
            console.error(
              `[Network error]: ${JSON.stringify(networkError, null, 2)}`,
            );
          }
        }
      }),
      new HttpLink({
        uri: process.browser ? '/api/graphql' : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain': ctx.req.headers.host,
              'x-meepshop-authorization-token':
                ctx.req.cookies['x-meepshop-authorization-token'],
            },
      }),
    ]),
  });
};

export default (
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtx['ctx'],
): ApolloClient<NormalizedCacheObject> => {
  if (!process.browser) return create(initialState, ctx);

  if (!apolloClient) apolloClient = create(initialState, ctx);

  return apolloClient;
};
