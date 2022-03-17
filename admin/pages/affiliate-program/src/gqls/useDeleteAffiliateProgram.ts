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

export const useDeleteAffiliateProgramFragment = gql`
  fragment useDeleteAffiliateProgramFragment on User {
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
