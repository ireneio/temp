// import
import { gql } from '@apollo/client';

// graphql import
import {
  applyForReturnOrExchangeWithOrderOrderClientFragment,
  applyForReturnOrExchangeWithOrderOrderProductAppliedForReturnOrExchangeFragment,
} from '@store/apollo/lib/gqls/applyForReturnOrExchangeWithOrder';

// definition
export const applyForReturnOrExchange = gql`
  mutation applyForReturnOrExchange(
    $input: ApplyForReturnOrExchangeInput!
    $orderId: ID!
  ) {
    applyForReturnOrExchange(input: $input) {
      ... on OrderProductsAppliedForReturnOrExchange {
        result {
          id
          ...applyForReturnOrExchangeWithOrderOrderProductAppliedForReturnOrExchangeFragment
        }
      }
    }

    applyForReturnOrExchangeWithOrder(orderId: $orderId) @client {
      id
      ...applyForReturnOrExchangeWithOrderOrderClientFragment
    }
  }

  ${applyForReturnOrExchangeWithOrderOrderProductAppliedForReturnOrExchangeFragment}
  ${applyForReturnOrExchangeWithOrderOrderClientFragment}
`;
