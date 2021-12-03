// import
import { gql } from '@apollo/client';

// definition
export const createEcpayAtmToken = gql`
  mutation createEcpayAtmToken($input: CreateEcpayAtmTokenInput!) {
    createEcpayAtmToken(input: $input) {
      status
      token
      billPaymentId
    }
  }
`;

export const createECPayATMPayment = gql`
  mutation createECPayATMPayment($input: CreateECPayATMPaymentInput!) {
    createECPayATMPayment(input: $input) {
      status
      atmBankCode
      atmAccount
    }
  }
`;
