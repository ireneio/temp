// import
import { gql } from '@apollo/client';

// definition
export const usePartnerInitialValuesFragment = gql`
  fragment usePartnerInitialValuesFragment on AffiliatePartner {
    id
    name
    email
    phone
    lineId
    facebookUrl
    instagramUrl
    address
    memo
  }
`;
