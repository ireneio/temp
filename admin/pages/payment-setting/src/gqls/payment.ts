// import
import gql from 'graphql-tag';

// definition
export const paymentFragment = gql`
  fragment paymentFragment on Store {
    id
    setting {
      billing {
        billingType
        payment {
          creditCard {
            id
            lastFourDigit
          }
          isRecurring
        }
      }
    }
  }
`;
