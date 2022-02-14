// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useSpecificShipmentOptionFragment = gql`
  fragment useSpecificShipmentOptionFragment on StoreShipment {
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
