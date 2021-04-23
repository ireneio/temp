// import
import gql from 'graphql-tag';

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
