// TODO: T6429
// import
import React, { useState } from 'react';
import { emptyFunction } from 'fbjs';

// definition
const CartContext = React.createContext<{
  cartIsOpened: boolean;
  toggleCart: (cartIsOpened: boolean) => void;
}>({
  cartIsOpened: false,
  toggleCart: emptyFunction,
});

export const CartProvider = React.memo(({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cartIsOpened: isOpened,
        toggleCart: setIsOpened,
      }}
    >
      {children}
    </CartContext.Provider>
  );
});

export default CartContext;
