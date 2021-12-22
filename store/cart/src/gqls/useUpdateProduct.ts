// import
import { gql } from '@apollo/client';

// graphql import
import { cartOrderFragment } from './useMapCartItem';

// definition
export const updateProduct = gql`
  mutation updateProduct($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartOrderFragment
    }
  }

  ${cartOrderFragment}
`;
