// import
import gql from 'graphql-tag';

// graphql import
import { recordFragment } from '@admin/order-history-records/gqls';

// definition
export const refactorOrderHistoryRecordsFragment = gql`
  fragment refactorOrderHistoryRecordsFragment on OrderAuditLog {
    ...recordFragment
  }

  ${recordFragment}
`;
