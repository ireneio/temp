// import
import { gql } from '@apollo/client';

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
