// import
import gql from 'graphql-tag';

// definition
export const useUpdateGoogleAnalyticsFragment = gql`
  fragment useUpdateGoogleAnalyticsFragment on Store {
    id
    adTracks {
      googleAnalyticsId
    }
  }
`;
