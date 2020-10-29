// import
import gql from 'graphql-tag';

// graphql import
import {
  useImageImageFragment,
  useLinkFragment,
} from '@meepshop/image/lib/gqls';

// definition
export const imageTextFragment = gql`
  fragment imageTextFragment on ImageTextModule {
    id
    image {
      ...useImageImageFragment
    }
    link {
      ...useLinkFragment
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

  ${useImageImageFragment}
  ${useLinkFragment}
`;
