// import
import gql from 'graphql-tag';

// graphql import
import { detailFragment } from './detail';

// definition
export const recordFragment = gql`
  fragment recordFragment on OrderAuditLog {
    ...detailFragment
    createdAt
    operator {
      type
      name
      email
    }
    totalAmountDelta {
      before
      after
    }
  }

  ${detailFragment}
`;
