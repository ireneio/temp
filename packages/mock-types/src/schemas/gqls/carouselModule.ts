// import
import { gql } from '@apollo/client';

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
