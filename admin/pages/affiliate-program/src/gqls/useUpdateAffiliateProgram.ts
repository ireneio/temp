// import
import { gql } from '@apollo/client';

// graphql import
import { useProgramInitialValuesFragment } from './useProgramInitialValues';

// definition
export const updateAffiliateProgram = gql`
  mutation updateAffiliateProgram($input: UpdateAffiliateProgramInput!) {
    updateAffiliateProgram(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useUpdateAffiliateProgramFragment = gql`
  fragment useUpdateAffiliateProgramFragment on AffiliateProgram {
    __typename
    id
    affiliatePartner {
      __typename
      id
    }
    products {
      __typename
      id
      title {
        __typename
      }
      coverImage {
        __typename
        scaledSrc {
          __typename
        }
      }
      variants {
        __typename
        id
      }
    }
    ...useProgramInitialValuesFragment
  }

  ${useProgramInitialValuesFragment}
`;
