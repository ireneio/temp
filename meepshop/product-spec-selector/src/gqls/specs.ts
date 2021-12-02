// import
import { gql } from '@apollo/client';

// definition
// NO_FILTER
export const specsFragment = gql`
  fragment specsFragment on SpecValue {
    id
    title {
      zh_TW
    }
  }
`;
