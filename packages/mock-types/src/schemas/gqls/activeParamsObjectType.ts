// import
import { gql } from '@apollo/client';

// definition
export const activeParamsObjectTypeMockFragment = gql`
  fragment activeParamsObjectTypeMockFragment on activeParamsObjectType {
    color
    background
    borderColor
  }
`;
