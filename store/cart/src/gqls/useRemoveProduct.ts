// import
import { gql } from '@apollo/client';

// graphql import
import { cartOrderFragment } from './index';

// definition
export const removeProduct = gql`
  mutation removeProduct($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartOrderFragment
    }
  }

  ${cartOrderFragment}
`;
