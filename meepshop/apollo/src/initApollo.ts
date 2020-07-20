// typescript import
import {
  NormalizedCacheObject,
  IntrospectionResultData,
} from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client/core/types';

import { CustomCtxType } from './index';
import { errorFilterType } from './utils/errorLink';

// import
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

import { modulesDataType } from '@meepshop/modules';

import * as ColorList from './ColorList';
import * as PageInfo from './PageInfo';
import mergeResolvers from './utils/mergeResolvers';
import errorLink from './utils/errorLink';

// typescript definition
export interface ConfigType {
  name: string;
  introspectionQueryResultDataType?: IntrospectionResultData['__schema']['types'];
  initializeCache?: ((cache: InMemoryCache, ctx?: CustomCtxType) => void)[];
  resolvers?: Resolvers[];
  errorFilter?: errorFilterType;
}

// definition
const {
  publicRuntimeConfig: { API_HOST, VERSION },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  {
    name,
    introspectionQueryResultDataType = [],
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
          types: [...introspectionQueryResultDataType, modulesDataType],
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
    resolvers: [...resolvers, ColorList.resolvers, PageInfo.resolvers].reduce(
      mergeResolvers,
      {},
    ),
    link: ApolloLink.from([
      errorLink(errorFilter),
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
                ctx.ctx.req.cookies['x-meepshop-authorization-token'],
            },
      }),
    ]),
  });
};

export default (
  config: ConfigType,
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtxType,
): ApolloClient<NormalizedCacheObject> => {
  if (typeof window === 'undefined') return create(config, initialState, ctx);

  if (!apolloClient) apolloClient = create(config, initialState, ctx);

  return apolloClient;
};
