// import
import { gql } from '@apollo/client';

// definition
export const addressServiceMockFragment = gql`
  fragment addressServiceMockFragment on AddressService {
    countries {
      id
    }
  }
`;
