// import
import { gql } from '@apollo/client';

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
