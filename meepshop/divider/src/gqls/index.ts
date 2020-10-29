// import
import gql from 'graphql-tag';

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
