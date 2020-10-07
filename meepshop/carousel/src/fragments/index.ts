// import
import gql from 'graphql-tag';

// graphql import
import {
  imageImageFragment,
  imageLinkFragment,
} from '@meepshop/image/lib/fragments';

// definition
export default gql`
  fragment carouselFragment on CarouselModule {
    id
    images {
      image {
        ...imageImageFragment
      }
      link {
        ...imageLinkFragment
      }
    }
    width
    autoPlay
    hoverPause
    showIndicator
    showController
    alt
  }

  ${imageImageFragment}
  ${imageLinkFragment}
`;
