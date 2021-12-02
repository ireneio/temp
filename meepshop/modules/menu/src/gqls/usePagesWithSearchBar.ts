// import
import { gql } from '@apollo/client';

// definition
export const usePagesWithSearchBarFragment = gql`
  fragment usePagesWithSearchBarFragment on MenuDesignObjectType {
    showSearchbar
  }
`;
