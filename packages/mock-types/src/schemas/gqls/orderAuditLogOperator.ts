// import
import gql from 'graphql-tag';

// definition
export const orderChangeOperatorMockFragment = gql`
  fragment orderChangeOperatorMockFragment on OrderAuditLogOperator {
    type
    name
    email
  }
`;
