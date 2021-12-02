// import
import { gql } from '@apollo/client';

// graphql import
import { creditFragment } from './credit';

// definition
export const allpayFragment = gql`
  fragment allpayFragment on paymentInfoType {
    ...creditFragment
    id
    list {
      memo {
        allpay {
          BankCode
          vAccount
          PaymentNo
          Barcode1
          Barcode2
          Barcode3
          ExpireDate
        }
      }
    }
  }

  ${creditFragment}
`;
