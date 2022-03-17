// import
import { gql } from '@apollo/client';

import { useProgramsColumnsFragment } from './useProgramsColumns';

// definition
export const getAffiliatePrograms = gql`
  query getAffiliatePrograms(
    $after: String
    $filter: AffiliateProgramsFilterInput
  ) {
    viewer {
      id
      affiliatePrograms(first: 10, after: $after, filter: $filter)
        @connection(key: "affiliate-programs") {
        edges {
          ...useProgramsColumnsFragment
        }
        pageInfo {
          endCursor
          currentInfo(input: { pageId: "affiliate-programs" }) @client {
            id
            current
          }
        }
        total
      }
      affiliatePartners(first: 1) {
        total
      }
    }
  }

  ${useProgramsColumnsFragment}
`;

export const setAffiliateProgramsCurrent = gql`
  mutation setAffiliateProgramsCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
