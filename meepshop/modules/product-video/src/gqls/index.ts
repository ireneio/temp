// import
import { gql } from '@apollo/client';

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
