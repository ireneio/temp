// import
import { gql } from '@apollo/client';

// graphql import
import { LineItemFragment } from '@meepshop/apollo/lib/gqls/LineItem';
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useProductsColumnsFragment = gql`
  fragment useProductsColumnsFragment on LineItem {
    id
    ...LineItemFragment
    quantity
    unitPrice
    type
    status
    cartId(cartProducts: $cartProducts) @client
    discountAllocations {
      activityId: id
      title {
        ...localeFragment
      }
    }
    coverImage {
      id
      ...thumbnailFragment
    }
    title {
      ...localeFragment
    }
    variant {
      id
      ...productAmountSelectorFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${LineItemFragment}
  ${localeFragment}
  ${thumbnailFragment}
  ${productAmountSelectorFragment}
`;
