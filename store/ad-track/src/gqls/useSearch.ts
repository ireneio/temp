// import
import { gql } from '@apollo/client';

// definition
export const useSearchFragment = gql`
  fragment useSearchFragment on AdTracks {
    googleAnalyticsId
  }
`;
