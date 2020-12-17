// import
import gql from 'graphql-tag';

// definition
export const videoFragment = gql`
  fragment videoFragment on VideoModule {
    id
    width
    ratio
    href
  }
`;
