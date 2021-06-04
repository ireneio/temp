// import
import gql from 'graphql-tag';

// graphql import
import { infoFragment } from '../info/gqls';
import { useAdTrackFragment } from './useAdTrack';

// definition
export const getOrderInThankYouPage = gql`
  query getOrderInThankYouPage($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        ...infoFragment
        ...useAdTrackFragment
      }
    }
  }

  ${infoFragment}
  ${useAdTrackFragment}
`;
