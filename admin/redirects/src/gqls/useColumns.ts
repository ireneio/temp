// import
import gql from 'graphql-tag';

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
  }
  ${useColumnsRoutingRuleFragment}
`;
