// import
import gql from 'graphql-tag';

// definition
export const paymentAccountForEzpayMockFragment = gql`
  fragment paymentAccountForEzpayMockFragment on PaymentAccountForEzpay {
    merchantNumber
  }
`;
