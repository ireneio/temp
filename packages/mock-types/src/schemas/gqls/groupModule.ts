// import
import { gql } from '@apollo/client';

// definition
export const groupModuleMockFragment = gql`
  fragment groupModuleMockFragment on GroupModule {
    percentWidth
    componentWidth
    padding
    releaseTime
  }
`;
