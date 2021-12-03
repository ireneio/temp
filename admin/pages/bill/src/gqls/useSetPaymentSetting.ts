// import
import { gql } from '@apollo/client';

// definition
export const setPaymentSetting = gql`
  mutation setPaymentSetting($input: SetStoreBillingPaymentSettingInput!) {
    setStoreBillingPaymentSetting(input: $input) {
      status
    }
  }
`;
