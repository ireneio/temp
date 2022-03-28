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
    __typename
    id
    affiliatePartners(first: 10) @connection(key: "affiliate-partners") {
      __typename
      edges {
        __typename
        node {
          __typename
          id
        }
      }
      total
    }
  }
`;
