// import
import gql from 'graphql-tag';

// definition
export const useLoadMoreImagesFragment = gql`
  fragment useLoadMoreImagesFragment on PageInfo {
    hasNextPage
    endCursor
  }
`;
