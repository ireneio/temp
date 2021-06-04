// import
import gql from 'graphql-tag';

// definition
export const gmoCvsFragment = gql`
  fragment gmoCvsFragment on Order {
    id
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

    priceInfo {
      total
    }
  }
`;
