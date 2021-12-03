// import
import { gql } from '@apollo/client';

// definition
export const imageModuleMockFragment = gql`
  fragment imageModuleMockFragment on ImageModule {
    width
    justifyContent
    alt
  }
`;
