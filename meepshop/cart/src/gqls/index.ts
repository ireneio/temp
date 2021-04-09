// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

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
          id
          scaledSrc {
            w120
          }
        }
        type
        _error
        error @client
      }
    }

    activityInfo {
      activityId: id
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

  ${localeFragment}
`;

export const getCart = gql`
  query getCart {
    getCartList {
      data {
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;
