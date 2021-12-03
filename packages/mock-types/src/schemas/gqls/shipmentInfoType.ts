// import
import { gql } from '@apollo/client';

// definition
export const shipmentInfoTypeMockFragment = gql`
  fragment shipmentInfoTypeMockFragment on shipmentInfoType {
    status
  }
`;
