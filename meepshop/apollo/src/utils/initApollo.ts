// typescript import
import { NormalizedCacheObject, Resolvers, ApolloLink } from '@apollo/client';

import { LoggerInfoType } from '@meepshop/logger';

import { CustomCtxType } from '../types';
import { errorFilterType } from './errorLink';

// import
import {
  ApolloClient,
  from,
  InMemoryCache,
  defaultDataIdFromObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import initialLogger from '@meepshop/logger';

// Generate by build-cache-config
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import cacheConfig from '../../cacheConfig';

import * as ComputedCart from '../clientSideSchema/ComputedCart';
import * as LineItem from '../clientSideSchema/LineItem';
import * as getDraftText from '../clientSideSchema/getDraftText';
import * as guestCart from '../clientSideSchema/guestCart';
import * as landingPageAccessToken from '../clientSideSchema/landingPageAccessToken';
import * as log from '../clientSideSchema/log';
import * as login from '../clientSideSchema/login';
import * as logout from '../clientSideSchema/logout';
import * as PageInfo from '../clientSideSchema/PageInfo';
import * as settingObjectType from '../clientSideSchema/settingObjectType';
import * as upsertGuestCart from '../clientSideSchema/upsertGuestCart';
import * as validatedConvenienceStoreCities from '../clientSideSchema/validatedConvenienceStoreCities';

import mergeResolvers from './mergeResolvers';
import errorLink from './errorLink';

// typescript definition
export interface ConfigType {
  name: string;
  terminatingLink: ApolloLink;
  initializeCache?: ((cache: InMemoryCache, ctx?: CustomCtxType) => void)[];
  resolvers?: Resolvers[];
  errorFilter?: errorFilterType;
  loggerInfo?: LoggerInfoType;
}

// definition
const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const create = (
  {
    name,
    terminatingLink,
    initializeCache = [],
    resolvers = [],
    errorFilter = Boolean,
    loggerInfo,
  }: ConfigType,
  initialState?: NormalizedCacheObject,
  ctx?: CustomCtxType,
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    ...cacheConfig,
    dataIdFromObject: (data: { id: string }) =>
      data.id || defaultDataIdFromObject(data),
  }).restore(initialState || {});
  const logger = initialLogger(loggerInfo);

  if (!initialState)
    initializeCache.forEach(initialize => initialize(cache, ctx));

  return new ApolloClient({
    name,
    version: `${process.env.NEXT_PUBLIC_VERSION}-${
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
      upsertGuestCart.resolvers,
      settingObjectType.resolvers(logger),
      validatedConvenienceStoreCities.resolvers,
      getDraftText.resolvers(logger),
      guestCart.resolvers,
      ComputedCart.resolvers,
      LineItem.resolvers,
    ].reduce(mergeResolvers, {}),
    link: from([
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
      setContext(() => ({
        uri:
          typeof window !== 'undefined'
            ? '/api/graphql'
            : `${process.env.MEEPSHOP_API}/graphql`,
        credentials: 'include',
        headers: {
          ...(!ctx
            ? {}
            : {
                'x-meepshop-domain': ctx.ctx.req.headers.host,
                'x-meepshop-authorization-token':
                  ctx.ctx.req.cookies?.['x-meepshop-authorization-token'] || '',
              }),
          'x-meepshop-unique-id': loggerInfo?.identity || '',
        },
      })),
      terminatingLink,
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
