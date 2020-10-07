// import
import gql from 'graphql-tag';

// graphql import
import {
  imageImageFragment,
  imageLinkFragment,
} from '@meepshop/image/lib/fragments';

// definition
export default gql`
  fragment imageTextFragment on ImageTextModule {
    id
    image {
      ...imageImageFragment
    }
    link {
      ...imageLinkFragment
    }
    width
    title {
      content
      fontSize
    }
    description {
      content
      fontSize
    }
    button {
      content
      fontSize
    }
    titleBold
    color
    hoverColor
    position
    alt
  }

  ${imageImageFragment}
  ${imageLinkFragment}
`;
