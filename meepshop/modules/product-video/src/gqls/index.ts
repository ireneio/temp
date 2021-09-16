// import
import gql from 'graphql-tag';

// definition
export const productVideoFragment = gql`
  fragment productVideoFragment on ProductVideoModule {
    id
    width
    ratio
    product {
      id
      videoLink {
        value
      }
    }
  }
`;
