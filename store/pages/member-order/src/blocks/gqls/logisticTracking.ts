// import
import { gql } from '@apollo/client';

// definition
export const logisticTrackingFragment = gql`
  fragment logisticTrackingFragment on OrderLogisticTracking {
    status
    updatedAt
  }
`;
