// import
import { gql } from 'apollo-boost';

// definition
export default gql`
  fragment colorsFragment on ColorList {
    data {
      id
      selected
      themes {
        id
        colors
      }
    }

    colors @client
  }
`;
