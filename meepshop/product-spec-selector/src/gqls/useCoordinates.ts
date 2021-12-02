// import
import { gql } from '@apollo/client';

// graphql import
import { useVariantsTreeFragment } from '@meepshop/hooks/lib/gqls/useVariantsTree';

// definition
// NO_FILTER
export const useCoordinatesFragment = gql`
  fragment useCoordinatesFragment on Product {
    id
    variants {
      id
      currentMinPurchasableQty
    }
    ...useVariantsTreeFragment
  }

  ${useVariantsTreeFragment}
`;
