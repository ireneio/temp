// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';
import { thumbnailFragment } from '@meepshop/thumbnail';

// definition
export const cartFragment = gql`
  fragment cartFragment on Order {
    id
    categories {
      id
      products {
        id
        cartId
        productId
        variantId
        quantity
        discountPrice
        activityInfo {
          id
          title {
            ...localeFragment
          }
          discountPrice
        }
        stock
        minPurchaseItems
        maxPurchaseLimit
        retailPrice
        listPrice
        totalPrice
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
          ...thumbnailFragment
        }
        type
        error: _error
      }
    }

    activityInfo {
      id
      title {
        ...localeFragment
      }
      discountPrice
    }

    priceInfo {
      currency
      discount
      orderDiscount
      productDiscount
      shipmentFee
      productPrice
      total
    }
  }

  ${thumbnailFragment}
  ${localeFragment}
`;

export const getCart = gql`
  query getCart {
    getCartList(search: { showDetail: true }) {
      data {
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;