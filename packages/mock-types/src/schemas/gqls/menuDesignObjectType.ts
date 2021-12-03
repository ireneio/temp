// import
import { gql } from '@apollo/client';

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
