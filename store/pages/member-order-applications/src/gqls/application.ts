// import
import gql from 'graphql-tag';

// graphql import
import {
  useColumnsMemberOrderApplicationsFragment,
  useColumnsOrderApplyFragment,
} from './useColumns';

// definition
export const applicationOrderApplyFragment = gql`
  fragment applicationOrderApplyFragment on OrderApply {
    id
    createdAt
    recipient {
      name
      mobile
      address {
        streetAddress
      }
    }
    ...useColumnsOrderApplyFragment
  }

  ${useColumnsOrderApplyFragment}
`;

export const applicationFragment = gql`
  fragment applicationFragment on Order {
    id
    applications @client {
      id
      ...applicationOrderApplyFragment
      extra {
        id
        ...applicationOrderApplyFragment
      }
    }
    ...useColumnsMemberOrderApplicationsFragment
  }

  ${useColumnsMemberOrderApplicationsFragment}
  ${applicationOrderApplyFragment}
`;
