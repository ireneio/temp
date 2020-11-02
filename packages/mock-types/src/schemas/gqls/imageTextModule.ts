// import
import gql from 'graphql-tag';

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
    position
    alt
  }
`;
