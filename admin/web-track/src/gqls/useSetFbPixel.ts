// import
import gql from 'graphql-tag';

// definition
export const useSetFbPixelFragment = gql`
  fragment useSetFbPixelFragment on Store {
    id
    adTracks {
      facebookPixelId
    }
  }
`;

export const setFbPixel = gql`
  mutation setFbPixel($input: FbPixelInput!) {
    setFbPixel(input: $input) {
      pixelId
    }
  }
`;
