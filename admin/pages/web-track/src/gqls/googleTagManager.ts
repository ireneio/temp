// import
import { gql } from '@apollo/client';

// definition
export const googleTagManagerFragment = gql`
  fragment googleTagManagerFragment on Store {
    id
    adTracks {
      googleTagManager
    }
  }
`;
