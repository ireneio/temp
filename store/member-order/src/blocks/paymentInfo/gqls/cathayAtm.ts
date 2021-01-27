// import
import gql from 'graphql-tag';

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
