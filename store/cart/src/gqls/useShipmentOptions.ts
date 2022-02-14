// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useShipmentOptionsFragment = gql`
  fragment useShipmentOptionsFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
    description {
      ...localeFragment
    }
  }

  ${localeFragment}
`;
