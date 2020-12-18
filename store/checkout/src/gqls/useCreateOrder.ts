// import
import gql from 'graphql-tag';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';

// definition
export const createOrder = gql`
  mutation createOrder($createOrderList: [NewOrder]) {
    createOrderList(createOrderList: $createOrderList) {
      id
      orderNo
      error: _error
      formData {
        ...formDataFragment
      }
    }
  }

  ${formDataFragment}
`;
