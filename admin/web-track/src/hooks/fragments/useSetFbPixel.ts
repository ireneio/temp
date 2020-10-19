// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment updateFacebookCacheFragment on Store {
    id
    adTrack @client {
      facebookPixelId
    }
  }
`;
