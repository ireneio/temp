// import
import gql from 'graphql-tag';

// definition
export const productsObjectTypeOrderApplyFragment = gql`
  fragment productsObjectTypeOrderApplyFragment on OrderApply {
    id
    orderProductId
    quantity
    status
  }
`;

export const availableProductsForApplyOrderFragment = gql`
  fragment availableProductsForApplyOrderFragment on Order {
    id
    products {
      id
      type
      quantity
    }
  }
`;
