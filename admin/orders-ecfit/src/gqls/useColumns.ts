// import
import gql from 'graphql-tag';

// definition
export const useColumnsFragment = gql`
  fragment useColumnsFragment on OrderConnection {
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
        lastEcfitRequestRecord {
          createdAt
          response
        }
      }
    }
    total
  }
`;
