// import
import { gql } from '@apollo/client';

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
