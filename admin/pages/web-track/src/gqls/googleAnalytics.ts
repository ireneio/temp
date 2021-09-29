// import
import gql from 'graphql-tag';

// definition
export const googleAnalyticsFragment = gql`
  fragment googleAnalyticsFragment on Store {
    id
    adTracks {
      googleAnalyticsId
    }
  }
`;
