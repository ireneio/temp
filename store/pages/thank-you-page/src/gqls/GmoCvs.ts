// import
import { gql } from '@apollo/client';

// definition
export const gmoCvsFragment = gql`
  fragment gmoCvsFragment on Order {
    id
    priceInfo {
      total
    }
    paymentInfo {
      id
      list {
        id
        cvsPayCode {
          payCode
          expireDate
        }
        accountInfo {
          gmo {
            paymentType
          }
        }
      }
    }
  }
`;
