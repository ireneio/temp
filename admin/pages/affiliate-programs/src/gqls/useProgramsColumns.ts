// import
import { gql } from '@apollo/client';

// graphql import
import { tagFragment } from './tag';

// definition
export const useProgramsColumnsFragment = gql`
  fragment useProgramsColumnsFragment on AffiliateProgramEdge {
    node {
      id
      title
      affiliatePartner {
        id
        name
      }
      commissionRate
      startAt
      endAt
      ...tagFragment
    }
  }

  ${tagFragment}
`;
