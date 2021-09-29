// import
import gql from 'graphql-tag';

// definition
export const useValidatorFragment = gql`
  fragment useValidatorFragment on Store {
    id
    routingRules {
      id
      fromPath
      toPath
    }
  }
`;
