// import
import { gql } from '@apollo/client';

// definition
export const useViewProductFragment = gql`
  fragment useViewProductFragment on AdTracks {
    googleAnalyticsId
  }
`;
