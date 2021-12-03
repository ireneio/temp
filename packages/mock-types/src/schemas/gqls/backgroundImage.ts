// import
import { gql } from '@apollo/client';

// definition
export const backgroundImageMockFragment = gql`
  fragment backgroundImageMockFragment on BackgroundImage {
    cover
    repeat
  }
`;
