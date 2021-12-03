// import
import { gql } from '@apollo/client';

// definition
export const updateStoreList = gql`
  mutation updateStoreList($value: [UpdateStore]) {
    updateStoreList(updateStoreList: $value) {
      id
    }
  }
`;

export const updateStoreSettingFragment = gql`
  fragment updateStoreSettingFragment on Store {
    id
    locale
    timezone
    domain
    description {
      introduction
      name
    }
    faviconImage {
      id
    }
    logoImage {
      id
    }
    mobileLogoImage {
      id
    }
    setting {
      senderInfo {
        name
        phoneNumber
        streetAddress
      }
    }
  }
`;
