// import
import { gql } from '@apollo/client';

// graphql import
import { useShoppingInitialValuesFragment } from './useShoppingInitialValues';

// definition
export const settingShoppingUpdateStoreList = gql`
  mutation settingShoppingUpdateStoreList($updateStoreList: [UpdateStore]) {
    updateStoreList(updateStoreList: $updateStoreList) {
      id
      error: _error
    }
  }
`;

export const updateShoppingSettingFragment = gql`
  fragment updateShoppingSettingFragment on Store {
    id
    setting {
      ...useShoppingInitialValuesFragment
      __typename
      checkoutFields {
        __typename
      }
      invoice {
        __typename
        paper {
          __typename
          duplicate {
            __typename
          }
          triplicate {
            __typename
          }
          donation {
            __typename
          }
        }
        electronic {
          __typename
          ecpay {
            __typename
          }
          triplicate {
            __typename
          }
          donation {
            __typename
          }
          membershipCarrier {
            __typename
          }
          citizenDigitalCertificateCarrier {
            __typename
          }
          mobileBarCodeCarrier {
            __typename
          }
        }
      }
      order {
        __typename
      }
      rewardPointReminder {
        __typename
      }
    }
  }

  ${useShoppingInitialValuesFragment}
`;
