// import
import { gql } from '@apollo/client';

// graphql import
import { creditFragment } from './credit';

// definition
export const gmoOrderFragment = gql`
  fragment gmoOrderFragment on Order {
    id
    paymentInfo {
      ...creditFragment
      id
      list {
        id
        atm {
          bankCode
          account
          expireDate
        }
        cvsPayCode {
          payCode
          expireDate
        }
      }
    }
    priceInfo {
      total
    }
  }

  ${creditFragment}
`;
