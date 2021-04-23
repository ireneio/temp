// import
import gql from 'graphql-tag';

// definition
export const useSetFacebookAdTracksFragment = gql`
  fragment useSetFacebookAdTracksFragment on Store {
    id
    adTracks {
      facebookPixelId
      facebookConversionsAccessToken
    }
  }
`;

export const setFacebookAdTracks = gql`
  mutation setFacebookAdTracks($input: SetFacebookAdTracksInput!) {
    setFacebookAdTracks(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;
