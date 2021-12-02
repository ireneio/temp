// import
import { gql } from '@apollo/client';

// graphql import
import { useHeightFragment } from './useHeight';

// definition
export const googleMapFragment = gql`
  fragment googleMapFragment on GoogleMapModule {
    id
    href
    ...useHeightFragment
  }

  ${useHeightFragment}
`;
