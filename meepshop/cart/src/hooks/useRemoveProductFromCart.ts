// typescript import
import { MutationFunction } from '@apollo/client';

// import
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  removeProductFromCart as removeProductFromCartType,
  removeProductFromCartVariables,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { removeProductFromCart } from '../gqls/useRemoveProductFromCart';

// definition
export default (): MutationFunction<
  removeProductFromCartType,
  removeProductFromCartVariables
> => {
  const [mutation] = useMutation<
    removeProductFromCartType,
    removeProductFromCartVariables
  >(removeProductFromCart);

  return mutation;
};
