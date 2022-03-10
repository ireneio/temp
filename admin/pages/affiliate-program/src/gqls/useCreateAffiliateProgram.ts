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
