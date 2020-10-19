// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment facebookStoreFragment on Store {
    id
    setting {
      fbDPALink
    }
    adTrack @client {
      facebookPixelId
    }
  }
`;
