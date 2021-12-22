// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Role as RoleContext } from '@meepshop/context';
import CheckoutSteps from '@store/checkout-steps';

import Empty from './Empty';
import Login from './Login';
import Products from './Products';
import Price from './Price';
import useMapCartItem from './hooks/useMapCartItem';
import useComputedCart from './hooks/useComputedCart';
import useCheckErrors from './hooks/useCheckErrors';
import styles from './styles/index.less';

// graphql import
import { useProductsColumnsFragment } from './gqls/useProductsColumns';
import { priceComputedCartFragment } from './gqls/price';

// definition
const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  const { cartItems, cartProducts } = useMapCartItem();
  const computedCart = useComputedCart(cartItems, cartProducts);
  const { hasError, checkErrors } = useCheckErrors(
    computedCart?.computedLineItems || null,
  );

  return (
    <>
      <div className={styles.root}>
        {!computedCart ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <>
            <CheckoutSteps step="cart" />

            {!computedCart.computedLineItems.length ? (
              <Empty />
            ) : (
              <>
                {role !== 'GUEST' ? null : <Login />}

                <Products
                  products={filter(
                    useProductsColumnsFragment,
                    computedCart.computedLineItems,
                  )}
                  hasError={hasError}
                />

                <Price
                  computedCart={filter(priceComputedCartFragment, computedCart)}
                  checkErrors={checkErrors}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
