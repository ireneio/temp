// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment googleMapFragment on GoogleMapModule {
    width
    height
    href
  }
`;
