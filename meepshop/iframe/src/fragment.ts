// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment iframeFragment on IframeModule {
    id
    htmlCode
  }
`;
