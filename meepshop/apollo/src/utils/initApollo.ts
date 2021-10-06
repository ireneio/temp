// typescript import
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client/core/types';

import { LoggerInfoType } from '@meepshop/logger';

import { CustomCtxType } from '../types';
import { errorFilterType } from './errorLink';

// import
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { ApolloLink } from 'apollo-link';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import getConfig from 'next/config';

import initialLogger from '@meepshop/logger';

// Generate by build-fragment-types
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import fragmentTypes from '../../fragmentTypes';

import * as getDraftText from '../client-side-schema/getDraftText';
import * as landingPageAccessToken from '../client-side-schema/landingPageAccessToken';
import * as log from '../client-side-schema/log';
import * as login from '../client-side-schema/login';
import * as logout from '../client-side-schema/logout';
import * as PageInfo from '../client-side-schema/PageInfo';
import * as productsObjectType from '../client-side-schema/productsObjectType';
import * as settingObjectType from '../client-side-schema/settingObjectType';
import * as validatedConvenienceStoreCities from '../client-side-schema/validatedConvenienceStoreCities';

import mergeResolvers from './mergeResolvers';
import errorLink from './errorLink';

// typescript definition
export interface ConfigType {
  name: string;
  initializeCache?: ((cache: InMemoryCache, ctx?: CustomCtxType) => void)[];
  resolvers?: Resolvers[];
  errorFilter?: errorFilterType;
  loggerInfo?: LoggerInfoType;
}

// definition
const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();
const {
  publicRuntimeConfig: { API, VERSION },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  {
    name,
    initializeCache = [],
    resolvers = [],
    errorFilter = Boolean,
    loggerInfo,
  }: ConfigType,
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtxType,
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    dataIdFromObject: ({ id }) => id,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentTypes,
    }),
  }).restore(initialState || {});
  const logger = initialLogger(loggerInfo);

  if (!initialState)
    initializeCache.forEach(initialize => initialize(cache, ctx));

  return new ApolloClient({
    name,
    version: `${VERSION}-${
      typeof window === 'undefined' ? 'server' : 'browser'
    }`,
    connectToDevTools: typeof window !== 'undefined',
    ssrMode: typeof window === 'undefined',
    cache,
    resolvers: [
      ...resolvers,
      landingPageAccessToken.resolvers,
      log.resolvers(logger),
      login.resolvers,
      logout.resolvers,
      PageInfo.resolvers,
      productsObjectType.resolvers,
      settingObjectType.resolvers(logger),
      validatedConvenienceStoreCities.resolvers,
      getDraftText.resolvers(logger),
    ].reduce(mergeResolvers, {}),
    link: ApolloLink.from([
      new RetryLink({
        delay: {
          initial: 500,
          max: Infinity,
          jitter: true,
        },
        attempts: {
          max: 10,
          retryIf: error =>
            Boolean(error) && ![401, 403].includes(error.statusCode),
        },
      }),
      errorLink(errorFilter, logger),
      link,
      new HttpLink({
        uri: typeof window !== 'undefined' ? '/api/graphql' : `${API}/graphql`,
        credentials: 'include',
        headers: !ctx
          ? {}
          : {
              'x-meepshop-domain': ctx.ctx.req.headers.host,
              'x-meepshop-authorization-token':
                ctx.ctx.req.cookies?.['x-meepshop-authorization-token'] || '',
              'merchant-applicant-verify-token':
                ctx.ctx.req.cookies?.['merchant-applicant-verify-token'] || '',
            },
      }),
    ]),
  });
};

export { useApolloNetworkStatus };

export default (
  ...args: Parameters<typeof create>
): ApolloClient<NormalizedCacheObject> => {
  if (typeof window === 'undefined') return create(...args);

  if (!apolloClient) apolloClient = create(...args);

  return apolloClient;
};
