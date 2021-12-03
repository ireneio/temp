// import
import { gql } from '@apollo/client';

// definition
export const updateRoutingRule = gql`
  mutation updateRoutingRule($input: UpdateRoutingRuleInput!) {
    updateRoutingRule(input: $input) {
      status
    }
  }
`;

export const useUpdateRoutingRuleFragment = gql`
  fragment useUpdateRoutingRuleFragment on RoutingRule {
    id
    fromPath
    toPath
  }
`;
