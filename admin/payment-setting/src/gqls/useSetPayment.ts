// import
import gql from 'graphql-tag';

// definition
export const setStoreBillingPaymentSetting = gql`
  mutation setStoreBillingPaymentSetting(
    $input: SetStoreBillingPaymentSettingInput!
  ) {
    setStoreBillingPaymentSetting(input: $input) {
      status
    }
  }
`;

export const useSetPaymentStoreFragment = gql`
  fragment useSetPaymentStoreFragment on Store {
    id
    setting {
      billing {
        payment {
          method
          creditCard {
            id
            lastFourDigit
          }
          isRecurring
        }
      }
    }
  }
`;
