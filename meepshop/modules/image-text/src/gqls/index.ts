// import
import { gql } from '@apollo/client';

// graphql import
import { useImageImageFragment, useLinkFragment } from '@meepshop/image/gqls';

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
    buttonHoverColor
    position
    alt
  }

  ${useImageImageFragment}
  ${useLinkFragment}
`;
