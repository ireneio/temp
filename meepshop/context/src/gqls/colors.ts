// import
import gql from 'graphql-tag';

// definition
export const getColors = gql`
  query getColors {
    getColorList {
      data {
        id
        selected
        themes {
          id
          colors
        }
      }
    }
  }
`;
