// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const filterShipmentFragment = gql`
  fragment filterShipmentFragment on StoreShipment {
    id
    status
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;
