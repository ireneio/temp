// import
import gql from 'graphql-tag';

// definition
export const orderInfoFragment = gql`
  fragment orderInfoFragment on User {
    id
    store {
      id
      description {
        name
      }
    }
    order(orderId: $orderId) {
      id
      orderNo
      priceInfo {
        total
      }
    }
  }
`;
