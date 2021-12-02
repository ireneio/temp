// import
import { gql } from '@apollo/client';

// graphql import
import { cartFragment } from './index';

// definition
export const addProductToCart = gql`
  mutation addProductToCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;

export const updateCartCache = gql`
  query updateCartCache {
    getCartList {
      data {
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;
