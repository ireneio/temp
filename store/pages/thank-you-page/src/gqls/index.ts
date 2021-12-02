// import
import { gql } from '@apollo/client';

// graphql import
import { cathayAtmFragment } from './CathayAtm';
import { gmoAtmFragment } from './GmoAtm';
import { gmoCvsFragment } from './GmoCvs';
import { ecpayCreditFragment } from './EcpayCredit';
import { useAdTrackFragment } from './useAdTrack';

// definition
export const getOrderInThankYouPage = gql`
  query getOrderInThankYouPage($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        paymentInfo {
          id
          list {
            id
            template
          }
        }
        ...useAdTrackFragment
        ...cathayAtmFragment
        ...gmoAtmFragment
        ...gmoCvsFragment
      }

      ...ecpayCreditFragment
    }
  }

  ${useAdTrackFragment}
  ${cathayAtmFragment}
  ${gmoAtmFragment}
  ${gmoCvsFragment}
  ${ecpayCreditFragment}
`;
