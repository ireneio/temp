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

export const useCreateAffiliatePartnerFragment = gql`
  fragment useCreateAffiliatePartnerFragment on User {
    id
    affiliatePartners(first: 10) @connection(key: "affiliate-partners") {
      edges {
        node {
          id
        }
      }
      total
    }
  }
`;
