// import
import { gql } from '@apollo/client';

// definition
export const useAddToCartFragment = gql`
  fragment useAddToCartFragment on AdTracks {
    googleAnalyticsId
  }
`;
