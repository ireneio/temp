// import
import gql from 'graphql-tag';

// definition
export const ecfitFragment = gql`
  fragment ecfitFragment on StoreEcfitSettings {
    serviceType
    companyToken
    apiKey
  }
`;
