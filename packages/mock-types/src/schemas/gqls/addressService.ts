// import
import gql from 'graphql-tag';

// definition
export const addressServiceMockFragment = gql`
  fragment addressServiceMockFragment on AddressService {
    countries {
      id
    }
  }
`;
