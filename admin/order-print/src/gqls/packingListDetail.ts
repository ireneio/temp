// imoprt
import { gql } from '@apollo/client';

// graphql import
import { usePackingColumnsFragment } from './usePackingColumns';

// definition
export const packingListDetailFragment = gql`
  fragment packingListDetailFragment on User {
    id
    store {
      id
      timezone
      description {
        name
      }
    }
    order(orderId: $orderId) {
      id
      orderNo
      status
      createdAt
      categories {
        products {
          id
          ...usePackingColumnsFragment
        }
      }
      shipmentInfo {
        list {
          name
          number
          recipient {
            name
            mobile
            comment
          }
        }
      }
      paymentInfo {
        id
        list {
          name
        }
      }
      userInfo {
        name
      }
      priceInfo {
        productPrice
        productDiscount
        orderDiscount
        shipmentFee
        shipmentDiscount
        paymentFee
        adjust
        total
      }
      invoices {
        type
        method
        carrier {
          type
        }
        code
        issuedAt
      }
    }
  }

  ${usePackingColumnsFragment}
`;
