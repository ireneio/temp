// import
import { gql } from '@apollo/client';

// definition
export const getGMOUser = gql`
  query getGMOUser($storePaymentId: ID!) {
    gmoUser: getGMOUser(getGMOUser: { storePaymentId: $storePaymentId }) {
      exist
      cardNumberFront
      cardNumberLater
    }
  }
`;
