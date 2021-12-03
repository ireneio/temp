// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const advancedSearchStorePaymentFragment = gql`
  fragment advancedSearchStorePaymentFragment on StorePayment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export const advancedSearchStoreShipmentFragment = gql`
  fragment advancedSearchStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;
