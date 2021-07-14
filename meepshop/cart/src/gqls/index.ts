// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { productsObjectTypeFragment } from '@meepshop/apollo/lib/gqls/productsObjectType';

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
        variant {
          id
          currentMinPurchasableQty
          currentMaxPurchasableQty
        }
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
        error @client
        ...productsObjectTypeFragment
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
  ${productsObjectTypeFragment}
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
