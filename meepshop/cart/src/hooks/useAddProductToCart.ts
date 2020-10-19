// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  addProductToCart as addProductToCartType,
  addProductToCartVariables,
} from '../gqls/__generated__/addProductToCart';
import { updateCartCache as updateCartCacheType } from '../gqls/__generated__/updateCartCache';

// graphql import
import { addProductToCart, updateCartCache } from '../gqls/useAddProductToCart';

// definition
export default (): MutationTuple<
  addProductToCartType,
  addProductToCartVariables
>[0] => {
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
