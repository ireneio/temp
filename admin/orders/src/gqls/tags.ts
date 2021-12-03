// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const tagsStorePaymentFragment = gql`
  fragment tagsStorePaymentFragment on StorePayment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export const tagsStoreShipmentFragment = gql`
  fragment tagsStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;
