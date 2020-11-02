// import
import gql from 'graphql-tag';

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
