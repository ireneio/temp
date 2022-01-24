// import
import { gql } from '@apollo/client';

// graphql import
import { storeShipmentDetailFragment } from './storeShipmentDetail';
import { packingListDetailFragment } from './packingListDetail';

// definition
export const shipmentPackingFragment = gql`
  fragment shipmentPackingFragment on User {
    id
    ...storeShipmentDetailFragment
    ...packingListDetailFragment
  }

  ${storeShipmentDetailFragment}
  ${packingListDetailFragment}
`;
