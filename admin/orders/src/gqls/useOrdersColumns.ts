// import
import { gql } from '@apollo/client';

// definition
export const useOrdersColumnsFragment = gql`
  fragment useOrdersColumnsFragment on OrderConnection {
    edges {
      node {
        id
        orderNo
        shipmentInfo {
          status
          list {
            id
            name
            recipient {
              name
            }
          }
        }
        paymentInfo {
          id
          status
        }
        status
        priceInfo {
          total
        }
        createdAt
      }
    }
    total
  }
`;
