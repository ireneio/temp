// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment dividerFragment on DividerModule {
    id
    width
    height
    justifyContent
    borderRadius
    background
  }
`;
