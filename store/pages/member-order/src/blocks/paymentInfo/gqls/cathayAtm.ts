// import
import { gql } from '@apollo/client';

// definition
export const cathayAtmOrderFragment = gql`
  fragment cathayAtmOrderFragment on Order {
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
