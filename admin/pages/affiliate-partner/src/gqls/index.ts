// import
import { gql } from '@apollo/client';

// graphql import
import { usePartnerInitialValuesFragment } from './usePartnerInitialValues';
import { useCreateAffiliatePartnerFragment } from './useCreateAffiliatePartner';
import { useUpdateAffiliatePartnerFragment } from './useUpdateAffiliatePartner';

// definition
export const getPartner = gql`
  query getPartner($id: ID!) {
    viewer {
      id
      ...useCreateAffiliatePartnerFragment
      affiliatePartner(id: $id) {
        id
        ...usePartnerInitialValuesFragment
        ...useUpdateAffiliatePartnerFragment
      }
    }
  }

  ${useCreateAffiliatePartnerFragment}
  ${usePartnerInitialValuesFragment}
  ${useUpdateAffiliatePartnerFragment}
`;
