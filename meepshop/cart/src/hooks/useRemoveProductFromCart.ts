// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  removeProductFromCart as removeProductFromCartType,
  removeProductFromCartVariables,
} from './__generated__/removeProductFromCart';

// graphql import
import cartFragment from '../fragments';

// definition
const mutation = gql`
  mutation removeProductFromCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;

export default (): MutationTuple<
  removeProductFromCartType,
  removeProductFromCartVariables
>[0] => {
  const [removeProductFromCart] = useMutation<
    removeProductFromCartType,
    removeProductFromCartVariables
  >(mutation);

  return removeProductFromCart;
};
