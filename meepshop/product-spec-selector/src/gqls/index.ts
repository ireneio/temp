// import
import gql from 'graphql-tag';

// graphql import
import { useCoordinatesFragment } from './useCoordinates';
import { specsFragment } from './specs';

// definition
// NO_FILTER
export const productSpecSelectorFragment = gql`
  fragment productSpecSelectorFragment on Product {
    id
    variants {
      id
      specs {
        id
        ...specsFragment
      }
    }
    ...useCoordinatesFragment
  }

  ${useCoordinatesFragment}
  ${specsFragment}
`;
