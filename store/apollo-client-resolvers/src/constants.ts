// typescript import
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

// typescript definition
export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}

// definition
export const PAYMENT_CAN_PAID_LATER = {
  allpay: {
    Credit: true,
    WebATM: true,
    ATM: false,
    CVS: false,
    BARCODE: false,
  },
  ezpay: {
    Credit: false,
    CS: false,
    ATM: false,
    WEBATM: false,
    MMK: false,
  },
  hitrust: true,
  gmo: false,
  custom: false,
};
