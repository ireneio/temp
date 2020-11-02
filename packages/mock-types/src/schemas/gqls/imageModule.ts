// import
import gql from 'graphql-tag';

// definition
export const imageModuleMockFragment = gql`
  fragment imageModuleMockFragment on ImageModule {
    width
    justifyContent
    alt
  }
`;
