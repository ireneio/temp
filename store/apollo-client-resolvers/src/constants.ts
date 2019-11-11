// typescript import
import {
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';

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
