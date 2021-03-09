// import
import gql from 'graphql-tag';

// graphql import
import { useVariantsTreeFragment } from '@meepshop/hooks/lib/gqls/useVariantsTree';

// definition
// NO_FILTER
export const useCoordinatesFragment = gql`
  fragment useCoordinatesFragment on Product {
    id
    variants {
      id
      stock
    }
    ...useVariantsTreeFragment
  }

  ${useVariantsTreeFragment}
`;
