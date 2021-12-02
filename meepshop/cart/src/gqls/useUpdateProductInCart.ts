// import
import { gql } from '@apollo/client';

// graphql import
import { cartFragment } from './index';

// definition
export const updateProductInCart = gql`
  mutation updateProductInCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;
