// import
import { gql } from '@apollo/client';

// definition
export const groupProductsObjectTypeMockFragment = gql`
  fragment groupProductsObjectTypeMockFragment on groupProductsObjectType {
    products {
      id
    }
  }
`;
