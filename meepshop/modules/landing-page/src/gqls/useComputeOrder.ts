// import
import { gql } from '@apollo/client';

// graphql import
import { shoppingOrderFragment } from './shopping';
import { priceFragment } from './price';
import { usePaymentsOrderFragment } from './usePayments';
import { useShipmentsOrderFragment } from './useShipments';
import { useFinishOrderFragment } from './useFinish';
// definition
export const computeOrderInLandingPage = gql`
  mutation computeOrderInLandingPage($computeOrderList: [NewOrder]) {
    computeOrderList(computeOrderList: $computeOrderList) {
      id

      ...shoppingOrderFragment
      ...priceFragment
      ...usePaymentsOrderFragment
      ...useShipmentsOrderFragment
      ...useFinishOrderFragment
    }
  }

  ${shoppingOrderFragment}
  ${priceFragment}
  ${usePaymentsOrderFragment}
  ${useShipmentsOrderFragment}
  ${useFinishOrderFragment}
`;
