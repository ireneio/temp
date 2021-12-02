// import
import { gql } from '@apollo/client';

// definition
export const dividerFragment = gql`
  fragment dividerFragment on DividerModule {
    id
    width
    height
    justifyContent
    borderRadius
    background
  }
`;
