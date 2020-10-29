// import
import gql from 'graphql-tag';

// definition
export const usePagesWithSearchBarFragment = gql`
  fragment usePagesWithSearchBarFragment on MenuDesignObjectType {
    showSearchbar
  }
`;
