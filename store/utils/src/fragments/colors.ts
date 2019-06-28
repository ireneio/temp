// import
import { gql } from 'apollo-boost';

// definition
export default gql`
  fragment colorsFragment on ColorList {
    data {
      selected
      themes {
        colors
      }
    }

    colors @client
  }
`;
