// import
import { gql } from '@apollo/client';

// definition
export const tagListMockFragment = gql`
  fragment tagListMockFragment on TagList {
    data {
      tags
    }
  }
`;
