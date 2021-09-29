// import
import gql from 'graphql-tag';

// definition
export const logisticTrackingFragment = gql`
  fragment logisticTrackingFragment on OrderLogisticTracking {
    status
    updatedAt
  }
`;
