// import
import gql from 'graphql-tag';

// graphql import
import { cartFragment } from './index';

// definition
export const removeProduct = gql`
  mutation removeProduct($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;
