// import
import { gql } from '@apollo/client';

// definition
export const useRetentionFragment = gql`
  fragment useRetentionFragment on Store {
    id
    setting {
      adRetentionMilliseconds
      adRetentionMillisecondsEnabled
    }
    adTracks {
      googleAnalyticsId
    }
  }
`;
