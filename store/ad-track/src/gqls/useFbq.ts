// import
import { gql } from '@apollo/client';

// definition
export const useFbqFragment = gql`
  fragment useFbqFragment on Store {
    id
    adTracks {
      facebookPixelId
      facebookConversionsAccessToken
    }
  }
`;
