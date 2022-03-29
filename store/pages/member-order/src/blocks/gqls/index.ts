// import
import { gql } from '@apollo/client';

// graphql import
import { paymentInfoFragment } from '../paymentInfo/gqls';
import { shipmentInfoFragment } from './shipmentInfo';
import { logisticTrackingFragment } from './logisticTracking';
import { invoiceInfoFragment } from '../invoiceInfo/gqls';

// definition
export const blocksFragment = gql`
  fragment blocksFragment on Order {
    id
    status

    userInfo {
      name
      email
      mobile
    }

    address {
      fullAddress
    }

    presco {
      shipmentNumber
    }

    shipmentInfo {
      status

      list {
        id
        name
        recipient {
          name
          email
          mobile
          comment
        }

        storeShipmentDetails {
          id
          searchLink
        }

        ...shipmentInfoFragment
      }
    }

    paymentInfo {
      id
      status

      list {
        id
        name
      }
    }

    invoices {
      ...invoiceInfoFragment
    }

    latestLogisticTracking {
      cvsShipmentNo

      ...logisticTrackingFragment
    }

    ...paymentInfoFragment
  }

  ${paymentInfoFragment}
  ${shipmentInfoFragment}
  ${logisticTrackingFragment}
  ${invoiceInfoFragment}
`;
