// import
import { gql } from '@apollo/client';

// definition
export const createAffiliateProgram = gql`
  mutation createAffiliateProgram($input: CreateAffiliateProgramInput!) {
    createAffiliateProgram(input: $input) {
      ... on AffiliateProgram {
        id
      }
    }
  }
`;

export const useCreateAffiliateProgramFragment = gql`
  fragment useCreateAffiliateProgramFragment on User {
    id
    affiliatePrograms(first: 10) @connection(key: "affiliate-programs") {
      edges {
        node {
          id
        }
      }
      total
    }
  }
`;
