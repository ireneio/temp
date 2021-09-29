// import
import gql from 'graphql-tag';

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
    }
    month
    currency
    totalFee
    localTotalFee
  }
`;
