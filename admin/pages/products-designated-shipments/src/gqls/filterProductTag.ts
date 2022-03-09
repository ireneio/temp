// import
import { gql } from '@apollo/client';

// definition
export const filterProductTagFragment = gql`
  fragment filterProductTagFragment on Tag {
    tags
  }
`;
