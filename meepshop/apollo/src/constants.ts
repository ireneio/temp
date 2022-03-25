// typescript import
import { AppContext } from 'next/app';
import { GetServerSidePropsContext } from 'next';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

// typescript definition
export interface CustomCtxType<Req = {}, Res = {}> extends AppContext {
  ctx: AppContext['ctx'] &
    GetServerSidePropsContext & {
      client: ApolloClient<NormalizedCacheObject>;
      req: Req & {
        cookies: {
          'x-meepshop-authorization-token': string;
          identity: string;
          promoCode: string;
        };
      };
      res: Res;
    };
}

export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}

// definition
export const COLORS = {
  black: '000000',
  white: 'ffffff',
  red: 'ff0000',
  orange: 'ffa500',
  yellow: 'ffff00',
  green: '008000',
  blue: '0000ff',
  purple: '800080',
};

export const FONTFAMILY = [
  '微軟正黑體',
  '標楷體',
  'PingFang TC',
  'Arial',
  'Arial Black',
  'Comic Sans MS',
  'Courier',
  'Courier New',
  'Franklin Gothic',
  'Georgia',
  'Helvetica',
  'Impace',
  'Lucida Grande',
  'Lucida Scans',
  'Monospace',
  'Tahoma',
  'Times',
  'Times New Roman',
  'Verdana',
];
