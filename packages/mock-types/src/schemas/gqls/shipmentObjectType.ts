// import
import { gql } from '@apollo/client';

// definition
export const shipmentObjectTypeMockFragment = gql`
  fragment shipmentObjectTypeMockFragment on shipmentObjectType {
    name
    number
    description
  }
`;
