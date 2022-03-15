// import
import { gql } from '@apollo/client';

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
      status
    }
  }
`;
