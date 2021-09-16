// import
import gql from 'graphql-tag';

// definition
export const iframeFragment = gql`
  fragment iframeFragment on IframeModule {
    id
    htmlCode
  }
`;
