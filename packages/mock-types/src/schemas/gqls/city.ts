// import
import gql from 'graphql-tag';

// definition
export const cityMockFragment = gql`
  fragment cityMockFragment on City {
    id
    name {
      zh_TW
    }
    areas {
      id
    }
  }
`;
