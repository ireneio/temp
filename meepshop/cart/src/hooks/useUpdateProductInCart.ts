// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  updateProductInCart as updateProductInCartType,
  updateProductInCartVariables,
} from '../gqls/__generated__/updateProductInCart';

// graphql import
import updateProductInCart from '../gqls/useUpdateProductInCart';

// definition
export default (): MutationTuple<
  updateProductInCartType,
  updateProductInCartVariables
>[0] => {
  const [mutation] = useMutation<
    updateProductInCartType,
    updateProductInCartVariables
  >(updateProductInCart);

  return mutation;
};
