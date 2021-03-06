// import
import { gql } from '@apollo/client';

// definition
export const imageTextModuleMockFragment = gql`
  fragment imageTextModuleMockFragment on ImageTextModule {
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
`;
