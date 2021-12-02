// import
import { gql } from '@apollo/client';

// graphql import
import { creditFragment } from './credit';

// definition
export const ecpayFragment = gql`
  fragment ecpayFragment on paymentInfoType {
    ...creditFragment
    id
    list {
      atm {
        bankCode
        account
        expireDate
      }
      cvsPayCode {
        payCode
        expireDate
      }
      barcode {
        barcode1
        barcode2
        barcode3
        expireDate
      }
    }
  }

  ${creditFragment}
`;
