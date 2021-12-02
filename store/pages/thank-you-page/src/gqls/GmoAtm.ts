// import
import { gql } from '@apollo/client';

// definition
export const gmoAtmFragment = gql`
  fragment gmoAtmFragment on Order {
    id
    priceInfo {
      total
    }
    paymentInfo {
      id
      list {
        id
        atm {
          bankCode
          account
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
