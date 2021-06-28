// import
import gql from 'graphql-tag';

// graphql import
import { useCreateRoutingRuleFragment } from './useCreateRoutingRule';

// definition
export const modalFragmet = gql`
  fragment modalFragmet on Store {
    id
    domain
    defaultDomain
    routingRules {
      id
      fromPath
      toPath
    }
    ...useCreateRoutingRuleFragment
  }

  ${useCreateRoutingRuleFragment}
`;
