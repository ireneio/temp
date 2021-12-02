// import
import { gql } from '@apollo/client';

// definition
export const useHeightFragment = gql`
  fragment useHeightFragment on GoogleMapModule {
    id
    width
    height
  }
`;
