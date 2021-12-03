// import
import { gql } from '@apollo/client';

// definition
export const headerFragment = gql`
  fragment headerFragment on Tag {
    id
    tags
  }
`;
