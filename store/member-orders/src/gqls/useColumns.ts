// import
import gql from 'graphql-tag';

// graphql import
import { orderOrderFragment } from '@store/apollo/lib/gqls/order';
import { actionsFragment } from './actions';

// definition
export const useColumnsOrdersFragment = gql`
  fragment useColumnsOrdersFragment on OrderEdge {
    node {
      id
      createdAt
      orderNo
      paymentInfo {
        status
      }
      shipmentInfo {
        status
      }
      status
      choosePayLaterWhenPlaced
      ...orderOrderFragment
      ...actionsFragment
    }
  }

  ${orderOrderFragment}
  ${actionsFragment}
`;
