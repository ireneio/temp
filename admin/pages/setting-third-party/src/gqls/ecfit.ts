// import
import { gql } from '@apollo/client';

// definition
export const ecfitFragment = gql`
  fragment ecfitFragment on StoreEcfitSettings {
    serviceType
    companyToken
    apiKey
  }
`;
