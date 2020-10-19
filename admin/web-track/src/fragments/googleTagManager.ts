// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment googleTagManagerFragment on Store {
    id
    adTrack @client {
      googleTagManager
    }
  }
`;
