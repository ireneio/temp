// import
import { gql } from '@apollo/client';

// definition
export const deleteRoutingRule = gql`
  mutation deleteRoutingRule($input: DeleteRoutingRuleInput!) {
    deleteRoutingRule(input: $input) {
      status
    }
  }
`;

export const useDeleteRoutingRuleFragment = gql`
  fragment useDeleteRoutingRuleFragment on Store {
    id
    routingRules {
      __typename
      id
      fromPath
      toPath
    }
  }
`;
