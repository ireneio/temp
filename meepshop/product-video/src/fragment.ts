// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment productVideoFragment on ProductVideoModule {
    id
    width
    ratio
    product {
      id
      videoLink {
        value
      }
    }
  }
`;
