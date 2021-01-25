// import
import gql from 'graphql-tag';

// definition
export const getGMOUser = gql`
  query getGMOUser($storePaymentId: ID!) {
    gmoUser: getGMOUser(getGMOUser: { storePaymentId: $storePaymentId }) {
      exist
      cardNumberFront
      cardNumberLater
    }

    viewer {
      id
      store {
        id
        experiment {
          gmoRememberCardEnabled
        }
      }
    }
  }
`;
