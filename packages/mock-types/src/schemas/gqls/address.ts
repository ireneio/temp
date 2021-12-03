// import
import { gql } from '@apollo/client';

// definition
export const addressMockFragment = gql`
  fragment addressMockFragment on Address {
    country {
      id
    }
    city {
      id
    }
    area {
      id
    }
    street
    zipCode
  }
`;
