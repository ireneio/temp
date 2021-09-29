// import
import gql from 'graphql-tag';

// definition
export const createRoutingRule = gql`
  mutation createRoutingRule($input: CreateRoutingRuleInput!) {
    createRoutingRule(input: $input) {
      status
      routingRule {
        id
      }
    }
  }
`;

export const useCreateRoutingRuleFragment = gql`
  fragment useCreateRoutingRuleFragment on Store {
    id
    routingRules {
      __typename
      id
      fromPath
      toPath
    }
  }
`;
