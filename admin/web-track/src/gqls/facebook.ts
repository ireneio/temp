// import
import gql from 'graphql-tag';

// definition
export const facebookStoreFragment = gql`
  fragment facebookStoreFragment on Store {
    id
    setting {
      fbDPALink
    }
    adTracks {
      facebookPixelId
      facebookConversionsAccessToken
    }
  }
`;
