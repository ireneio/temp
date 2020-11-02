// import
import gql from 'graphql-tag';

// definition
export const storeEcfitSettingsMockFragment = gql`
  fragment storeEcfitSettingsMockFragment on StoreEcfitSettings {
    isEnabled
    serviceType
    companyToken
    apiKey
  }
`;
