// import
import { gql } from '@apollo/client';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// definition
export const productAmountSelectorUserFragment = gql`
  fragment productAmountSelectorUserFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const productAmountSelectorLineItemFragment = gql`
  fragment productAmountSelectorLineItemFragment on LineItem {
    id
    productId
    variantId
    status
    quantity
    variant {
      id
      ...productAmountSelectorFragment
    }
    applicableShipments {
      id
    }
  }

  ${productAmountSelectorFragment}
`;
