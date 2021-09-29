// import
import gql from 'graphql-tag';

// definition
export const ecPay2CreatePayment = gql`
  mutation ecPay2CreatePayment($input: ECPay2CreatePaymentInput!) {
    ecPay2CreatePayment(input: $input) {
      ... on UnhandledECPay2CreatePaymentError {
        error
      }

      ... on ECPay2CreatePaymentError {
        code
        message
      }

      ... on ECPay2CreatePaymentRedirect {
        url
      }

      ... on OrderPaymentCredit {
        lastFourDigits
      }

      ... on OrderPaymentAtm {
        bankCode
        account
        expireDate
      }

      ... on OrderPaymentCVSPayCode {
        payCode
        paymentURL
        expireDate
      }

      ... on OrderPaymentBarcode {
        barcode1
        barcode2
        barcode3
        expireDate
      }
    }
  }
`;
