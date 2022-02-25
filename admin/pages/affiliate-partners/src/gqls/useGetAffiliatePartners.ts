// import
import { gql } from '@apollo/client';

import { usePartnersColumnsFragment } from './usePartnersColumns';

// definition
export const getAffiliatePartners = gql`
  query getAffiliatePartners(
    $after: String
    $filter: AffiliatePartnersFilterInput
  ) {
    viewer {
      id
      affiliatePartners(first: 10, after: $after, filter: $filter) {
        edges {
          ...usePartnersColumnsFragment
        }
        pageInfo {
          endCursor
          currentInfo(input: { pageId: "affiliate-partners" }) @client {
            id
            current
          }
        }
        total
      }
    }
  }

  ${usePartnersColumnsFragment}
`;

export const setAffiliatePartnersCurrent = gql`
  mutation setAffiliatePartnersCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
