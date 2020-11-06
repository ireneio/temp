// import
import gql from 'graphql-tag';

// definition
export const useViewProductFragment = gql`
  fragment useViewProductFragment on AdTracks {
    facebookPixelId
    googleAnalyticsId
  }
`;
