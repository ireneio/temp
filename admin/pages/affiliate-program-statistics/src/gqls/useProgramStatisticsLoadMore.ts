// import
import { gql } from '@apollo/client';

// definition
export const useProgramStatisticsLoadMoreFragment = gql`
  fragment useProgramStatisticsLoadMoreFragment on AffiliateProgramOrdersConnection {
    edges {
      node {
        id
      }
    }
    pageInfo {
      endCursor
      currentInfo(input: { pageId: "affiliate-program-statistics" }) @client {
        id
        current
      }
    }
    total
  }
`;

export const setAffiliateProgramStatisticsCurrent = gql`
  mutation setAffiliateProgramStatisticsCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
