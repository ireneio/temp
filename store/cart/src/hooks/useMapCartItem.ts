// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

// graphql typescript
import {
  getCartList as getCartListType,
  CartItemInput as CartItemInputType,
  CartProductsInput as CartProductsInputType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getCartList } from '../gqls/useMapCartItem';

// definition
export default (): {
  cartItems: CartItemInputType[];
  cartProducts: CartProductsInputType[];
} => {
  const { data } = useQuery<getCartListType>(getCartList);
  const products =
    data?.getCartList?.data?.[0]?.categories?.[0]?.products || [];

  return useMemo(
    () =>
      products.reduce(
        (result, product) => {
          return !product?.cartId
            ? result
            : {
                cartItems: [
                  ...result.cartItems,
                  {
                    productId: product?.productId || '',
                    quantity: product?.quantity || 0,
                    variantId: product?.variantId || '',
                  },
                ],
                cartProducts: [
                  ...result.cartProducts,
                  {
                    productId: product?.productId || '',
                    cartId: product.cartId,
                  },
                ],
              };
        },
        {
          cartItems: [],
          cartProducts: [],
        } as {
          cartItems: CartItemInputType[];
          cartProducts: CartProductsInputType[];
        },
      ),
    [products],
  );
};
