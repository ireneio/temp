// import
import gql from 'graphql-tag';

// definition
export const backgroundImageMockFragment = gql`
  fragment backgroundImageMockFragment on BackgroundImage {
    cover
    repeat
  }
`;
