// import
import gql from 'graphql-tag';

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
    getCartList(search: { showDetail: true }) {
      data {
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;
