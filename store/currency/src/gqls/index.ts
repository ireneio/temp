// import
import gql from 'graphql-tag';

// graphql import
import { useInitFxFragment } from './useInitFx';
import { useFormatFragment } from './useFormat';

// definition
export const getStoreCurrency = gql`
  query getStoreCurrency {
    viewer {
      id
      store {
        id
        ...useFormatFragment
      }
    }

    exchangeRateService {
      ...useInitFxFragment
    }
  }

  ${useFormatFragment}
  ${useInitFxFragment}
`;
