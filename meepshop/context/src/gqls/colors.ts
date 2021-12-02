// import
import { gql } from '@apollo/client';

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
