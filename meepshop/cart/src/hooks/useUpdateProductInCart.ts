// typescript import
import { MutationFunction } from '@apollo/client';

// import
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  updateProductInCart as updateProductInCartType,
  updateProductInCartVariables,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { updateProductInCart } from '../gqls/useUpdateProductInCart';

// definition
export default (): MutationFunction<
  updateProductInCartType,
  updateProductInCartVariables
> => {
  const [mutation] = useMutation<
    updateProductInCartType,
    updateProductInCartVariables
  >(updateProductInCart);

  return mutation;
};
