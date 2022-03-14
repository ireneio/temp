// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
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
    totalPrice
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;

export const useAddUpsellingProductFragment = gql`
  fragment useAddUpsellingProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    variants {
      id
      ...useAddUpsellingVariantFragment
    }
  }

  ${localeFragment}
  ${useAddUpsellingVariantFragment}
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
