// import
import gql from 'graphql-tag';

// definition
export const dividerModuleMockFragment = gql`
  fragment dividerModuleMockFragment on DividerModule {
    width
    height
    justifyContent
    borderRadius
    background
  }
`;
