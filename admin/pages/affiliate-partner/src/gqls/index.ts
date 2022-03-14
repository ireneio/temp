// import
import { gql } from '@apollo/client';

// graphql import
import { usePartnerInitialValuesFragment } from './usePartnerInitialValues';
import { useUpdateAffiliatePartnerFragment } from './useUpdateAffiliatePartner';

// definition
export const getPartner = gql`
  query getPartner($id: ID!) {
    viewer {
      id
      affiliatePartner(id: $id) {
        id
        ...usePartnerInitialValuesFragment
        ...useUpdateAffiliatePartnerFragment
      }
    }
  }

  ${usePartnerInitialValuesFragment}
  ${useUpdateAffiliatePartnerFragment}
`;
