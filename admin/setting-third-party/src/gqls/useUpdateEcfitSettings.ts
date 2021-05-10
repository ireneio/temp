// import
import gql from 'graphql-tag';

// definition
export const updateEcfitSettings = gql`
  mutation updateEcfitSettings($input: SetStoreEcfitSettingsInput!) {
    setStoreEcfitSettings(input: $input) {
      status
    }
  }
`;

export const useUpdateEcfitSettingsFragment = gql`
  fragment useUpdateEcfitSettingsFragment on Store {
    id
    storeEcfitSettings {
      isEnabled
      serviceType
      companyToken
      apiKey
    }
  }
`;
