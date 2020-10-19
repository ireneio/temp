// import
import gql from 'graphql-tag';

// graphql import
import useHeightFragment from './useHeight';

// definition
export default gql`
  fragment googleMapFragment on GoogleMapModule {
    id
    href
    ...useHeightFragment
  }

  ${useHeightFragment}
`;
