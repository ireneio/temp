// import
import { gql } from '@apollo/client';

// graphql import
import { cartFragment } from './index';

// definition
export const removeProductFromCart = gql`
  mutation removeProductFromCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;
