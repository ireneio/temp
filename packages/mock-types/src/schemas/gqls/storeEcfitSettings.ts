// import
import { gql } from '@apollo/client';

// definition
export const storeEcfitSettingsMockFragment = gql`
  fragment storeEcfitSettingsMockFragment on StoreEcfitSettings {
    isEnabled
    serviceType
    companyToken
    apiKey
  }
`;
