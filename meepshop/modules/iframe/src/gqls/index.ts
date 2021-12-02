// import
import { gql } from '@apollo/client';

// definition
export const iframeFragment = gql`
  fragment iframeFragment on IframeModule {
    id
    htmlCode
  }
`;
