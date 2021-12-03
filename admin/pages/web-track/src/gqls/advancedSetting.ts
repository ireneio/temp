// import
import { gql } from '@apollo/client';

// definition
export const updateAdRetentionMilliseconds = gql`
  mutation updateAdRetentionMilliseconds($updateStoreList: [UpdateStore]) {
    updateStoreList(updateStoreList: $updateStoreList) {
      id
      setting {
        adRetentionMilliseconds
        adRetentionMillisecondsEnabled
      }
    }
  }
`;

export const advancedSettingFragment = gql`
  fragment advancedSettingFragment on Store {
    id
    setting {
      adRetentionMillisecondsEnabled
      adRetentionMilliseconds
    }
  }
`;
