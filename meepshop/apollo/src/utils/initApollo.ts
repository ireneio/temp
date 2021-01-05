// typescript import
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client/core/types';

import { CustomCtxType } from '../index';

import { errorFilterType } from './errorLink';
import { IntrospectionQueryResultDataType } from './createIntrospectionQueryResultDataType';

// import
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import getConfig from 'next/config';

import modules from '@meepshop/modules';

import * as fbLogin from '../fbLogin';
import * as log from '../log';
import * as login from '../login';
import * as logout from '../logout';
import * as PageInfo from '../PageInfo';
import * as productsObjectType from '../productsObjectType';
import * as validatedConvenienceStoreCities from '../validatedConvenienceStoreCities';

import mergeResolvers from './mergeResolvers';
import errorLink from './errorLink';
import createIntrospectionQueryResultDataType from './createIntrospectionQueryResultDataType';

// typescript definition
export interface ConfigType {
  name: string;
  introspectionQueryResultData?: IntrospectionQueryResultDataType;
  initializeCache?: ((cache: InMemoryCache, ctx?: CustomCtxType) => void)[];
  resolvers?: Resolvers[];
  errorFilter?: errorFilterType;
}

// definition
const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();
const {
  publicRuntimeConfig: { API_HOST, VERSION },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  {
    name,
    introspectionQueryResultData = {},
    initializeCache = [],
    resolvers = [],
    errorFilter = Boolean,
  }: ConfigType,
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtxType,
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: createIntrospectionQueryResultDataType({
            ...introspectionQueryResultData,
            PageModule: Object.keys(modules),
            Link: [
              'GroupLink',
              'PageLink',
              'ProductLink',
              'ProductsLink',
              'EmailLink',
              'PhoneLink',
              'CustomLink',
            ],
          }),
        },
      },
    }),
  }).restore(initialState || {});

  if (!initialState)
    initializeCache.forEach(initialize => initialize(cache, ctx));

  return new ApolloClient({
    name,
    version: VERSION,
    connectToDevTools: typeof window !== 'undefined',
    ssrMode: typeof window === 'undefined',
    cache,
    resolvers: [
      ...resolvers,
      fbLogin.resolvers,
      log.resolvers,
      login.resolvers,
      logout.resolvers,
      PageInfo.resolvers,
      productsObjectType.resolvers,
      validatedConvenienceStoreCities.resolvers,
    ].reduce(mergeResolvers, {}),
    link: ApolloLink.from([
      errorLink(errorFilter),
      link,
      new HttpLink({
        uri:
          typeof window !== 'undefined'
            ? '/api/graphql'
            : `${API_HOST}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain': ctx.ctx.req.headers.host,
              'x-meepshop-authorization-token':
                ctx.ctx.req.cookies['x-meepshop-authorization-token'] || '',
              'merchant-applicant-verify-token':
                ctx.ctx.req.cookies['merchant-applicant-verify-token'] || '',
            },
      }),
    ]),
  });
};

export { useApolloNetworkStatus };

export default (
  config: ConfigType,
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtxType,
): ApolloClient<NormalizedCacheObject> => {
  if (typeof window === 'undefined') return create(config, initialState, ctx);

  if (!apolloClient) apolloClient = create(config, initialState, ctx);

  return apolloClient;
};
