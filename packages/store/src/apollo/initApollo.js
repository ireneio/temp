import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import getConfig from 'next/config';
import { notification } from 'antd';

import clientState from './clientState';
import shouldPrintError from './shouldPrintError';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

let apolloClient = null;

const create = (initialState, ctx) => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
  }).restore(initialState || {});

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: process.browser,
    link: ApolloLink.from([
      onError(({ response, graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          const errors = graphQLErrors.filter(shouldPrintError);

          if (errors.length === 0) {
            response.errors = null;
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
                message: '發生錯誤',
                description,
              });
            else console.error(description);
          });
        }

        if (networkError) {
          if (process.browser)
            notification.error({
              message: '發生錯誤',
              description: `[Network error]: ${networkError}`,
            });
          else console.error(`[Network error]: ${networkError}`);
        }
      }),
      clientState(cache),
      new HttpLink({
        uri: process.browser ? '/api' : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain': ctx.req.headers['x-meepshop-domain'],
              'x-meepshop-authorization-token':
                ctx.req.headers['x-meepshop-authorization-token'],
            },
      }),
    ]),
    cache,
  });
};

export default (...argu) => {
  if (!process.browser) return create(...argu);

  if (!apolloClient) apolloClient = create(...argu);

  return apolloClient;
};
