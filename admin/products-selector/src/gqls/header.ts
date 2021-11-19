// import
import gql from 'graphql-tag';

// definition
export const headerFragment = gql`
  fragment headerFragment on Tag {
    id
    tags
  }
`;
