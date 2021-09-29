// import
import gql from 'graphql-tag';

// graphql import
import { notFoundFragment } from './notFound';
import { totalSheetFragment } from './totalSheet';
import { blocksFragment } from '../blocks/gqls';
import { qaOrderFragment } from './qa';
import { useColumnsMemberOrderFragment } from './useColumns';

// definition
export const getMemberOrder = gql`
  query getMemberOrder($orderId: ID!) {
    viewer {
      id
      ...notFoundFragment
      order(orderId: $orderId) {
        id
        orderNo
        createdAt
        products {
          id
          ...useColumnsMemberOrderFragment
        }
        environment {
          sourcePage
        }
        ...qaOrderFragment
        ...totalSheetFragment
        ...blocksFragment
      }
    }
  }

  ${notFoundFragment}
  ${useColumnsMemberOrderFragment}
  ${totalSheetFragment}
  ${blocksFragment}
  ${qaOrderFragment}
`;
