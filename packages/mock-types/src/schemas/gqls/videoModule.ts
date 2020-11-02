// import
import gql from 'graphql-tag';

// definition
export const videoModuleMockFragment = gql`
  fragment videoModuleMockFragment on VideoModule {
    width
    ratio
    href
  }
`;
