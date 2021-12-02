// import
import { gql } from '@apollo/client';

// definition
export const cathayAtmFragment = gql`
  fragment cathayAtmFragment on Order {
    id
    priceInfo {
      total
    }
    paymentInfo {
      id
      list {
        id
        atm {
          bankName
          bankCode
          account
          expireDate
        }
      }
    }
  }
`;
