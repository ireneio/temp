// import
import { gql } from '@apollo/client';

// definition
export const useUpdateGoogleTagManagerFragment = gql`
  fragment useUpdateGoogleTagManagerFragment on Store {
    id
    adTracks {
      googleTagManager
    }
  }
`;
