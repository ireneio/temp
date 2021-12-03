// import
import { gql } from '@apollo/client';

// definition
export const cityMockFragment = gql`
  fragment cityMockFragment on City {
    id
    name {
      zh_TW
    }
    areas {
      id
    }
  }
`;
