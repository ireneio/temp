// import
import gql from 'graphql-tag';

// definition
export const useSearchFragment = gql`
  fragment useSearchFragment on AdTracks {
    facebookPixelId
    googleAnalyticsId
  }
`;
