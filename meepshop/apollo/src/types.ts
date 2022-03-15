// typescript import
import { AppContext } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

// typescript definition
export interface CustomCtxType<Req = {}, Res = {}> extends AppContext {
  ctx: AppContext['ctx'] & {
    client: ApolloClient<NormalizedCacheObject>;
    req: Req & {
      cookies: {
        'x-meepshop-authorization-token': string;
        identity: string;
      };
    };
    res: Res;
  };
}

export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}
