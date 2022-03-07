// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// definition
export const useAddUpsellingUserFragment = gql`
  fragment useAddUpsellingUserFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const useAddUpsellingVariantFragment = gql`
  fragment useAddUpsellingVariantFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;

export const useAddUpsellingLineItemFragment = gql`
  fragment useAddUpsellingLineItemFragment on LineItem {
    id
    product {
      id
    }
    variant {
      id
    }
    quantity
  }
`;
