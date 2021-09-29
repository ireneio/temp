// import
import gql from 'graphql-tag';

// definition
export const useUpdateGoogleTagManagerFragment = gql`
  fragment useUpdateGoogleTagManagerFragment on Store {
    id
    adTracks {
      googleTagManager
    }
  }
`;
