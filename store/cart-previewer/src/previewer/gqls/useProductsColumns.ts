// import
import { gql } from '@apollo/client';

// graphql import
import { LineItemFragment } from '@meepshop/apollo/lib/gqls/LineItem';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useProductsColumnsInPreviewerFragment = gql`
  fragment useProductsColumnsInPreviewerFragment on LineItem {
    id
    ...LineItemFragment
    cartId(cartProducts: $cartProducts) @client
    quantity
    type
    unitPrice
    status
    discountAllocations {
      activityId: id
      title {
        ...localeFragment
      }
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    title {
      ...localeFragment
    }
    coverImage {
      id
      ...thumbnailFragment
    }
  }

  ${LineItemFragment}
  ${thumbnailFragment}
  ${localeFragment}
`;
