// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { emptyFunction } from 'fbjs';

import useAddProductToCart from './hooks/useAddProductToCart';
import useUpdateProductInCart from './hooks/useUpdateProductInCart';
import useRemoveProductFromCart from './hooks/useRemoveProductFromCart';

// graphql typescript
import {
  getCart as getCartType,
  getCart_getCartList_data as getCartGetCartListData,
  getCart_getCartList_data_categories as getCartGetCartListDataCategories,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getCart } from './gqls';

// definition
const CartContext = React.createContext<{
  carts:
    | (Omit<getCartGetCartListData, 'categories'> & {
        categories: getCartGetCartListDataCategories | null;
      })
    | null;
  addProductToCart:
    | ReturnType<typeof useAddProductToCart>
    | typeof emptyFunction;
  updateProductInCart:
    | ReturnType<typeof useUpdateProductInCart>
    | typeof emptyFunction;
  removeProductFromCart:
    | ReturnType<typeof useRemoveProductFromCart>
    | typeof emptyFunction;
}>({
  // FIXME: only use for @meepshop/meep-ui
  carts: null,
  addProductToCart: emptyFunction,
  updateProductInCart: emptyFunction,
  removeProductFromCart: emptyFunction,
});

export const CartProvider = React.memo(({ children }) => {
  const { data } = useQuery<getCartType>(getCart);
  const addProductToCart = useAddProductToCart();
  const updateProductInCart = useUpdateProductInCart();
  const removeProductFromCart = useRemoveProductFromCart();
  // FIXME: only use for @meepshop/meep-ui
  const carts = data?.getCartList?.data?.[0];

  return (
    <CartContext.Provider
      value={{
        carts: !carts
          ? null
          : {
              ...carts,
              categories: carts.categories?.[0] || null,
            },
        addProductToCart,
        updateProductInCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
});

export default CartContext;
