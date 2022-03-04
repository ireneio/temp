// import
import { gql } from '@apollo/client';

// definition
export const useProgramStatisticsColumnsFragment = gql`
  fragment useProgramStatisticsColumnsFragment on AffiliateProgramOrderEdge {
    node {
      id
      orderNo
      createdAt
      paymentStatus
      orderStatus
      total
      freight
      totalExcludeFreight
      commission
    }
  }
`;
