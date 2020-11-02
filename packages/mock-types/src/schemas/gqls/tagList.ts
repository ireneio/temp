// import
import gql from 'graphql-tag';

// definition
export const tagListMockFragment = gql`
  fragment tagListMockFragment on TagList {
    data {
      tags
    }
  }
`;
