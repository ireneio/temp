// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  removeProductFromCart as removeProductFromCartType,
  removeProductFromCartVariables,
} from '../gqls/__generated__/removeProductFromCart';

// graphql import
import removeProductFromCart from '../gqls/useRemoveProductFromCart';

// definition
export default (): MutationTuple<
  removeProductFromCartType,
  removeProductFromCartVariables
>[0] => {
  const [mutation] = useMutation<
    removeProductFromCartType,
    removeProductFromCartVariables
  >(removeProductFromCart);

  return mutation;
};
