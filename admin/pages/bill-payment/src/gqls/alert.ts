// import
import { gql } from '@apollo/client';

// definition
export const alertFragment = gql`
  fragment alertFragment on Store {
    id
    adminStatus
    unpaidBills {
      totalCount
    }
    firstBill: bills(first: 1) {
      edges {
        node {
          id
          payment {
            status
          }
        }
      }
    }
    setting {
      billing {
        invoice {
          accountType
          name
          addressV2 {
            country {
              id
            }
            city {
              id
            }
            area {
              id
            }
            street
          }
        }
      }
    }
  }
`;
