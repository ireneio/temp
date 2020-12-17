// import
import gql from 'graphql-tag';

// definition
export const menuDesignObjectTypeMockFragment = gql`
  fragment menuDesignObjectTypeMockFragment on MenuDesignObjectType {
    iconSize
    fontSize
    showSearchbar
    alignment
    expandSubItem
    showLogo
    opacity
    pattern
    active {
      __typename
    }
    hover {
      __typename
    }
    nornal {
      __typename
    }
  }
`;
