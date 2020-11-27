// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productsObjectTypeFragment on productsObjectType {
    id
    _error
    type
    stock
    minPurchaseItems
  }
`;
