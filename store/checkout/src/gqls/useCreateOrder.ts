// import
import { gql } from '@apollo/client';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';

// definition
export const createOrder = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        orderNo
        error: _error
        paymentServiceTradeToken
        formData {
          ...formDataFragment
        }
      }
    }
  }

  ${formDataFragment}
`;
