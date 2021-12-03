// import
import { gql } from '@apollo/client';

// definition
export const productCarouselModuleMockFragment = gql`
  fragment productCarouselModuleMockFragment on ProductCarouselModule {
    productCarouselType
    autoPlay
  }
`;
