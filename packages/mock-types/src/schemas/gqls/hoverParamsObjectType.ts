// import
import { gql } from '@apollo/client';

// definition
export const hoverParamsObjectTypeMockFragment = gql`
  fragment hoverParamsObjectTypeMockFragment on hoverParamsObjectType {
    color
    background
    borderColor
  }
`;
