// import
import gql from 'graphql-tag';

// graphql import
import { alertFragment } from './alert';
import { useColumnsFragment } from './useColumns';

// definition
export const getBills = gql`
  query getBills($after: String) {
    viewer {
      id
      store {
        id
        bills(first: 10, after: $after) {
          total
          pageInfo {
            endCursor
            currentInfo(input: { pageId: "bill-payment" }) @client {
              id
              current
            }
          }
          edges {
            cursor
            node {
              id
              payment {
                method
                status
              }
              month
              totalFee
              localTotalFee
            }
          }
        }

        ...alertFragment
        ...useColumnsFragment
      }
    }
  }

  ${alertFragment}
  ${useColumnsFragment}
`;

export const setBillsCurrent = gql`
  mutation setBillsCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
