// import
import gql from 'graphql-tag';

// definition
export const stylesFragment = gql`
  fragment stylesFragment on MenuDesignObjectType {
    pattern
    active {
      color
      background
      borderColor
    }
    hover {
      color
      background
      borderColor
    }
  }
`;
