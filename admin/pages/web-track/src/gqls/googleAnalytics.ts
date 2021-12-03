// import
import { gql } from '@apollo/client';

// definition
export const googleAnalyticsFragment = gql`
  fragment googleAnalyticsFragment on Store {
    id
    adTracks {
      googleAnalyticsId
    }
  }
`;
