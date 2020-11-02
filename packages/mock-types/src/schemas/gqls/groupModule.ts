// import
import gql from 'graphql-tag';

// definition
export const groupModuleMockFragment = gql`
  fragment groupModuleMockFragment on GroupModule {
    percentWidth
    componentWidth
    padding
    releaseTime
  }
`;
