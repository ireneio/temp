// import
import gql from 'graphql-tag';

// definition
export const setPaymentSetting = gql`
  mutation setPaymentSetting($input: SetStoreBillingPaymentSettingInput!) {
    setStoreBillingPaymentSetting(input: $input) {
      status
    }
  }
`;
