// import
import { gql } from '@apollo/client';

// definition
export const nornalParamsObjectTypeMockFragment = gql`
  fragment nornalParamsObjectTypeMockFragment on nornalParamsObjectType {
    color
    background
    borderColor
  }
`;
