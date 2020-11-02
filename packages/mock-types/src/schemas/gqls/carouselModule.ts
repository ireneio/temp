// import
import gql from 'graphql-tag';

// definition
export const carouselModuleMockFragment = gql`
  fragment carouselModuleMockFragment on CarouselModule {
    width
    autoPlay
    hoverPause
    showIndicator
    showController
    alt
  }
`;
