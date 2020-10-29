// import
import gql from 'graphql-tag';

// graphql import
import {
  useImageImageFragment,
  useLinkFragment,
} from '@meepshop/image/lib/gqls';

// definition
export const carouselFragment = gql`
  fragment carouselFragment on CarouselModule {
    id
    images {
      image {
        ...useImageImageFragment
      }
      link {
        ...useLinkFragment
      }
    }
    width
    autoPlay
    hoverPause
    showIndicator
    showController
    alt
  }

  ${useImageImageFragment}
  ${useLinkFragment}
`;
