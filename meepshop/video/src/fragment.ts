// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment videoFragment on VideoModule {
    id
    width
    ratio
    href
  }
`;
