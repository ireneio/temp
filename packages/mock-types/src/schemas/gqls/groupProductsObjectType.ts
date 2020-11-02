// import
import gql from 'graphql-tag';

// definition
export const groupProductsObjectTypeMockFragment = gql`
  fragment groupProductsObjectTypeMockFragment on groupProductsObjectType {
    products {
      id
    }
  }
`;
