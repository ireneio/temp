// import
import { gql } from '@apollo/client';

// definition
export const createAffiliatePartner = gql`
  mutation createAffiliatePartner($input: CreateAffiliatePartnerInput!) {
    createAffiliatePartner(input: $input) {
      ... on AffiliatePartner {
        id
      }
    }
  }
`;
