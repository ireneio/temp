// import
import { gql } from '@apollo/client';

// definition
export const countryMockFragment = gql`
  fragment countryMockFragment on Country {
    id
    name {
      zh_TW
    }
    cities {
      id
    }
  }
`;
