// import
import gql from 'graphql-tag';

// definition
export const routingRuleFragment = gql`
  fragment routingRuleFragment on RoutingRule {
    id
    fromPath
    toPath
  }
`;
