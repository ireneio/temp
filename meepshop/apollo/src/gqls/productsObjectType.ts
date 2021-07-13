// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productsObjectTypeFragment on productsObjectType {
    id
    error: _error
    type
    variant {
      id
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
`;
