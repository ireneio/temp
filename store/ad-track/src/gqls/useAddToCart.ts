// import
import gql from 'graphql-tag';

// definition
export const useAddToCartFragment = gql`
  fragment useAddToCartFragment on AdTracks {
    facebookPixelId
    googleAnalyticsId
  }
`;
