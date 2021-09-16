// import
import gql from 'graphql-tag';

// definition
export const useImageScaledURLsFragment = gql`
  fragment useImageScaledURLsFragment on ScaledURLs {
    w60
    w120
    w240
    w480
    w720
    w960
    w1200
    w1440
    w1680
    w1920
  }
`;

export const useImageImageFragment = gql`
  fragment useImageImageFragment on Image {
    id
    scaledSrc {
      ...useImageScaledURLsFragment
    }
  }

  ${useImageScaledURLsFragment}
`;
