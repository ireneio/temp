// import
import { gql } from '@apollo/client';

// definition
export const deleteAffiliateProgram = gql`
  mutation deleteAffiliateProgram($input: DeleteAffiliateProgramInput!) {
    deleteAffiliateProgram(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;
