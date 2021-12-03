// import
import { gql } from '@apollo/client';

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
