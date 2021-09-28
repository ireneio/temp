// import
import gql from 'graphql-tag';

// definition
export const paymentStoreBillingSettingFragment = gql`
  fragment paymentStoreBillingSettingFragment on StoreBillingSetting {
    payment {
      method
      creditCard {
        id
        lastFourDigit
      }
    }
  }
`;
