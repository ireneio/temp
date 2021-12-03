// typescript import
import { MutationFunction } from '@apollo/client';

// import
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  addProductToCart as addProductToCartType,
  addProductToCartVariables,
  updateCartCache as updateCartCacheType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { addProductToCart, updateCartCache } from '../gqls/useAddProductToCart';

// definition
export default (): MutationFunction<
  addProductToCartType,
  addProductToCartVariables
> => {
  const [mutation] = useMutation<
    addProductToCartType,
    addProductToCartVariables
  >(addProductToCart, {
    update: (cache, { data }) => {
      const cartCache = cache.readQuery<updateCartCacheType>({
        query: updateCartCache,
      });

      if (cartCache?.getCartList?.data?.[0] === null && data?.changeCartList)
        cache.writeQuery<updateCartCacheType>({
          query: updateCartCache,
          data: {
            getCartList: {
              __typename: 'OrderList',
              data: data.changeCartList,
            },
          },
        });
    },
  });

  return mutation;
};
