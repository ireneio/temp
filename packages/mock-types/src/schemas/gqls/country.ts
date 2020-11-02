// import
import gql from 'graphql-tag';

// definition
export const countryMockFragment = gql`
  fragment countryMockFragment on Country {
    id
    name {
      zh_TW
    }
    cities {
      id
    }
  }
`;
