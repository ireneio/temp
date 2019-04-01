import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import { notification } from 'antd';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const {
  publicRuntimeConfig: { API_HOST, API_DOMAIN },
} = getConfig();

function create(initialState, ctx) {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
  }).restore(initialState || {});

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (
          networkError.statusCode === 401 &&
          process.browser &&
          window.location.pathname !== '/login'
        ) {
          notification.error({
            message: '請重新登入',
            duration: 1,
            onClose: () => {
              window.location = '/login';
            },
          });
          return;
        }

        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
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
              description: `[Network error]: ${networkError}`,
            });
          else console.error(`[Network error]: ${networkError}`);
        }
      }),
      new HttpLink({
        uri: process.browser ? '/api' : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: {
          'x-meepshop-domain': API_DOMAIN,
          ...(ctx
            ? {
                'x-meepshop-authorization-token': ctx.req.get(
                  'x-meepshop-authorization-token',
                ),
              }
            : {}),
        },
      }),
    ]),
    cache,
  });
}

export default function initApollo(initialState, options) {
  if (!process.browser) return create(initialState, options);

  if (!apolloClient) apolloClient = create(initialState, options);

  return apolloClient;
}
