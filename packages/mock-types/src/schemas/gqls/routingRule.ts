// import
import { gql } from '@apollo/client';

// definition
export const routingRuleFragment = gql`
  fragment routingRuleFragment on RoutingRule {
    id
    fromPath
    toPath
  }
`;
