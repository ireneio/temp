// import
import { gql } from '@apollo/client';

// definition
export const useLoadMoreImagesFragment = gql`
  fragment useLoadMoreImagesFragment on PageInfo {
    hasNextPage
    endCursor
  }
`;
