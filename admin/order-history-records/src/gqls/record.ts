// import
import gql from 'graphql-tag';

// graphql import
import { detailFragment } from './detail';

// definition
export const recordFragment = gql`
  fragment recordFragment on OrderHistoryRecord {
    ...detailFragment
    createdAt
    actor {
      type
      name
      email
    }
    orderTotalAmountDelta {
      before
      after
    }
  }

  ${detailFragment}
`;
