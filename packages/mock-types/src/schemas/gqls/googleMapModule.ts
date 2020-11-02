// import
import gql from 'graphql-tag';

// definition
export const googleMapModuleMockFragment = gql`
  fragment googleMapModuleMockFragment on GoogleMapModule {
    width
    height
    href
  }
`;
