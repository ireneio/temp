// import
import gql from 'graphql-tag';

// definition
export const menuDesignObjectTypeMockFragment = gql`
  fragment menuDesignObjectTypeMockFragment on MenuDesignObjectType {
    fontSize
    iconSize
    showSearchbar
    alignment
    expandSubItem
    showLogo
  }
`;
