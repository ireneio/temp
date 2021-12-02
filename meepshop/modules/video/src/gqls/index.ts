// import
import { gql } from '@apollo/client';

// definition
export const videoFragment = gql`
  fragment videoFragment on VideoModule {
    id
    width
    ratio
    href
  }
`;
