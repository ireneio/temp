// import
import { gql } from '@apollo/client';

// definition
export const paymentAccountForEzpayMockFragment = gql`
  fragment paymentAccountForEzpayMockFragment on PaymentAccountForEzpay {
    merchantNumber
  }
`;
