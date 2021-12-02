// import
import { gql } from '@apollo/client';

// graphql import
import { creditFragment } from './credit';

// definition
export const ezpayFragment = gql`
  fragment ezpayFragment on paymentInfoType {
    ...creditFragment
    id
    list {
      id
      memo {
        ezpay {
          paycode
          expireDate
        }
      }
    }
  }

  ${creditFragment}
`;
