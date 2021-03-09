// import
import gql from 'graphql-tag';

// definition
// NO_FILTER
export const specsFragment = gql`
  fragment specsFragment on SpecValue {
    id
    title {
      zh_TW
    }
  }
`;
