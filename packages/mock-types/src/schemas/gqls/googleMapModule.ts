// import
import { gql } from '@apollo/client';

// definition
export const googleMapModuleMockFragment = gql`
  fragment googleMapModuleMockFragment on GoogleMapModule {
    width
    height
    href
  }
`;
