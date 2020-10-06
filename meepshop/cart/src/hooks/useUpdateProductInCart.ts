// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  updateProductInCart as updateProductInCartType,
  updateProductInCartVariables,
} from './__generated__/updateProductInCart';

// graphql import
import cartFragment from '../fragments';

// definition
const mutation = gql`
  mutation updateProductInCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;

export default (): MutationTuple<
  updateProductInCartType,
  updateProductInCartVariables
>[0] => {
  const [updateProductInCart] = useMutation<
    updateProductInCartType,
    updateProductInCartVariables
  >(mutation);

  return updateProductInCart;
};
