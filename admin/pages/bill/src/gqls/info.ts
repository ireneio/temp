// import
import { gql } from '@apollo/client';

// definition
export const infoFragment = gql`
  fragment infoFragment on StoreBill {
    id
    payment {
      method
      status
      creditCardLastFourDigit
      atmBankCode
      atmBankAccount
      isAtmBankCodeExpired
      payee
    }
    month
    currency
    totalFee
    localTotalFee
  }
`;
