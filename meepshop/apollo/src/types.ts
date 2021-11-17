// typescript import
import { AppContext } from 'next/app';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { LoggerInfoType } from '@meepshop/logger';

// typescript definition
export interface CustomCtxType<Req = {}, Res = {}> extends AppContext {
  ctx: AppContext['ctx'] & {
    client: ApolloClient<NormalizedCacheObject>;
    req: Req & {
      cookies: {
        'x-meepshop-authorization-token': string;
      };
      // FIXME: remove after next-store remove express
      loggerInfo: LoggerInfoType;
    };
    res: Res;
  };
}

export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}
