// import
import { gql } from '@apollo/client';

// graphql import
import { computedCartLineItemFragment } from '@meepshop/apollo/lib/gqls/computedCart';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const priceComputedCartFragment = gql`
  fragment priceComputedCartFragment on ComputedCart {
    computedLineItems {
      id
      quantity
      unitPrice
      ...computedCartLineItemFragment
    }
    productsDiscount @client {
      activityId: id
      discountPrice
      title {
        ...localeFragment
      }
    }
    orderDiscount {
      totalDiscount
      discountAllocations {
        id
        discountPrice
        title {
          ...localeFragment
        }
      }
    }
  }

  ${localeFragment}
  ${computedCartLineItemFragment}
`;
