// import
import gql from 'graphql-tag';

// definition
export const googleTagManagerFragment = gql`
  fragment googleTagManagerFragment on Store {
    id
    adTracks {
      googleTagManager
    }
  }
`;
