// import
import gql from 'graphql-tag';

// definition
export const cathayAtmFragment = gql`
  fragment cathayAtmFragment on Order {
    id
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

    priceInfo {
      total
    }
  }
`;
