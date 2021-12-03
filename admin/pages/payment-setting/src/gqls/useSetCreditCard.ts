// import
import { gql } from '@apollo/client';

// definition
export const removeStoreBillingPaymentCreditCardSetting = gql`
  mutation removeStoreBillingPaymentCreditCardSetting(
    $input: RemoveStoreBillingPaymentCreditCardSettingInput
  ) {
    removeStoreBillingPaymentCreditCardSetting(input: $input) {
      status
    }
  }
`;

export const useSetCreditCardStoreFragment = gql`
  fragment useSetCreditCardStoreFragment on Store {
    id
    setting {
      billing {
        payment {
          creditCard {
            id
            lastFourDigit
          }
        }
      }
    }
  }
`;
