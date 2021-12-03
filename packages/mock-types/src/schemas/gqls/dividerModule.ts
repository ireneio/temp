// import
import { gql } from '@apollo/client';

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
