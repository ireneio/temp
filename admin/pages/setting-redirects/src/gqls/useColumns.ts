// import
import { gql } from '@apollo/client';

// graphql import
import { useDeleteRoutingRuleFragment } from './useDeleteRoutingRule';

// definition
export const useColumnsRoutingRuleFragment = gql`
  fragment useColumnsRoutingRuleFragment on RoutingRule {
    id
    fromPath
    toPath
  }
`;

export const useColumnsStoreFragment = gql`
  fragment useColumnsStoreFragment on Store {
    id
    domain
    defaultDomain
    routingRules {
      id
      ...useColumnsRoutingRuleFragment
    }
    ...useDeleteRoutingRuleFragment
  }

  ${useColumnsRoutingRuleFragment}
  ${useDeleteRoutingRuleFragment}
`;
