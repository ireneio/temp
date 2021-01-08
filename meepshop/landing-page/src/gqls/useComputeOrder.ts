// import
import gql from 'graphql-tag';

// graphql import
import { shoppingOrderFragment } from './shopping';
import { priceFragment } from './price';
import { usePaymentsOrderFragment } from './usePayments';
import { useShipmentsOrderFragment } from './useShipments';
import { useSubmitOrderFragment } from './useSubmit';

// definition
export const computeOrderInLandingPage = gql`
  mutation computeOrderInLandingPage($computeOrderList: [NewOrder]) {
    computeOrderList(computeOrderList: $computeOrderList) {
      id

      ...shoppingOrderFragment
      ...priceFragment
      ...usePaymentsOrderFragment
      ...useShipmentsOrderFragment
      ...useSubmitOrderFragment
    }
  }

  ${shoppingOrderFragment}
  ${priceFragment}
  ${usePaymentsOrderFragment}
  ${useShipmentsOrderFragment}
  ${useSubmitOrderFragment}
`;
