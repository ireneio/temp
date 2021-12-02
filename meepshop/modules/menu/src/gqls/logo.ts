// import
import { gql } from '@apollo/client';

// definition
export const logoUserFragment = gql`
  fragment logoUserFragment on User {
    id
    store {
      id
      logoImage {
        id
        scaledSrc {
          w60
        }
      }

      mobileLogoImage {
        id
        scaledSrc {
          w60
        }
      }
    }
  }
`;

export const logoMenuDesignObjectTypeFragment = gql`
  fragment logoMenuDesignObjectTypeFragment on MenuDesignObjectType {
    showLogo
  }
`;
