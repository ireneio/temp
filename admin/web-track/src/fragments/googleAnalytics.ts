// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment googleAnalyticsFragment on Store {
    id
    adTrack @client {
      googleAnalyticsId
    }
  }
`;
