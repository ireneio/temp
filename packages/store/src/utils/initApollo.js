import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

let apolloClient = null;

const create = (initialState, ctx) =>
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: process.browser,
    link: new HttpLink({
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
    cache: new InMemoryCache({
      dataIdFromObject: ({ id }) => id,
    }).restore(initialState || {}),
  });

export default (...argu) => {
  if (!process.browser) return create(...argu);

  if (!apolloClient) apolloClient = create(...argu);

  return apolloClient;
};
