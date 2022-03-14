// import
import { gql } from '@apollo/client';

// graphql import
import { usePartnerInitialValuesFragment } from './usePartnerInitialValues';

// definition
export const updateAffiliatePartner = gql`
  mutation updateAffiliatePartner($input: UpdateAffiliatePartnerInput!) {
    updateAffiliatePartner(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useUpdateAffiliatePartnerFragment = gql`
  fragment useUpdateAffiliatePartnerFragment on AffiliatePartner {
    id
    ...usePartnerInitialValuesFragment
  }

  ${usePartnerInitialValuesFragment}
`;
