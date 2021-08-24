// import
import gql from 'graphql-tag';

// graphql import
import { cartFragment } from './index';

// definition
export const updateProduct = gql`
  mutation updateProduct($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;
