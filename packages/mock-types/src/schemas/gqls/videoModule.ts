// import
import { gql } from '@apollo/client';

// definition
export const videoModuleMockFragment = gql`
  fragment videoModuleMockFragment on VideoModule {
    width
    ratio
    href
  }
`;
