// import
import gql from 'graphql-tag';

// definition
export const useHeightFragment = gql`
  fragment useHeightFragment on GoogleMapModule {
    id
    width
    height
  }
`;
