// import
import gql from 'graphql-tag';

// definition
export const shipmentObjectTypeMockFragment = gql`
  fragment shipmentObjectTypeMockFragment on shipmentObjectType {
    name
    number
    description
  }
`;
