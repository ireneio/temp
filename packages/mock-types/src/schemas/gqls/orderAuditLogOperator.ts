// import
import { gql } from '@apollo/client';

// definition
export const orderChangeOperatorMockFragment = gql`
  fragment orderChangeOperatorMockFragment on OrderAuditLogOperator {
    type
    name
    email
  }
`;
