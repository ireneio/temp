// import
import { gql } from '@apollo/client';

// definition
export const useUpdateGoogleAnalyticsFragment = gql`
  fragment useUpdateGoogleAnalyticsFragment on Store {
    id
    adTracks {
      googleAnalyticsId
    }
  }
`;
