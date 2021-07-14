// import
import gql from 'graphql-tag';

// definition
export const productsObjectTypeFragment = gql`
  fragment productsObjectTypeFragment on productsObjectType {
    id
    serverError: _error
    type
    variant {
      id
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
`;
