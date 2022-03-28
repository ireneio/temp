// import
import { gql } from '@apollo/client';

// graphql import
import { usePartnerInitialValuesFragment } from './usePartnerInitialValues';
import { useCreateAffiliatePartnerFragment } from './useCreateAffiliatePartner';
import { useUpdateAffiliatePartnerFragment } from './useUpdateAffiliatePartner';

// definition
export const getPartner = gql`
  query getPartner($id: ID!, $isAdd: Boolean!) {
    viewer {
      id
      ...useCreateAffiliatePartnerFragment
      affiliatePartner(id: $id) @skip(if: $isAdd) {
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
