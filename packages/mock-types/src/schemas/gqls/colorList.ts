// import
import gql from 'graphql-tag';

// definition
export const colorListMockFragment = gql`
  fragment colorListMockFragment on ColorList {
    data {
      selected
      themes {
        colors
      }
    }
  }
`;
