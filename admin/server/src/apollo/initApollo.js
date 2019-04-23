import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import getConfig from 'next/config';
import Router from 'next/router';
import { notification } from 'antd';

const {
  publicRuntimeConfig: { API_HOST, VERSION },
} = getConfig();

let apolloClient = null;

const create = (initialState, ctx) => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
  }).restore(initialState || {});

  return new ApolloClient({
    name: 'admin',
    version: VERSION,
    connectToDevTools: process.browser,
    ssrMode: process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError = {} }) => {
        if (
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
        uri: process.browser ? '/api/graphql' : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain':
                process.env.API_DOMAIN || 'admin.stage.meepcloud.com',
              'x-meepshop-authorization-token':
                ctx.req.cookies['x-meepshop-authorization-token'],
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
