// import
import gql from 'graphql-tag';

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
