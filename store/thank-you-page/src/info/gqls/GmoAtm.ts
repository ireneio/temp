// import
import gql from 'graphql-tag';

// definition
export const gmoAtmFragment = gql`
  fragment gmoAtmFragment on Order {
    id
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

    priceInfo {
      total
    }
  }
`;
