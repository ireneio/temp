// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import useAddProductToCart from './hooks/useAddProductToCart';
import useUpdateProductInCart from './hooks/useUpdateProductInCart';
import useRemoveProductFromCart from './hooks/useRemoveProductFromCart';

// definition
const CartContext = React.createContext<{
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
  addProductToCart: emptyFunction,
  updateProductInCart: emptyFunction,
  removeProductFromCart: emptyFunction,
});

export const CartProvider = React.memo(({ children }) => {
  const addProductToCart = useAddProductToCart();
  const updateProductInCart = useUpdateProductInCart();
  const removeProductFromCart = useRemoveProductFromCart();
  // FIXME: only use for @meepshop/meep-ui

  return (
    <CartContext.Provider
      value={{
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
