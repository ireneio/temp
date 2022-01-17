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
import useComputedCart from './hooks/useComputedCart';
import useCheckErrors from './hooks/useCheckErrors';
import styles from './styles/index.less';

// graphql import
import { useComputedCartFragment } from './gqls/useComputedCart';
import {
  productsUserFragment,
  productsLineItemFragment,
} from './gqls/products';
import { priceComputedCartFragment } from './gqls/price';

// definition
const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  // FIXME: using useQuery and getCart in T9918
  const viewer = null;
  const computedCart = useComputedCart(filter(useComputedCartFragment, viewer));
  const { hasError, checkErrors } = useCheckErrors(
    computedCart?.computedLineItems || null,
  );

  return (
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
                viewer={filter(productsUserFragment, viewer)}
                products={filter(
                  productsLineItemFragment,
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
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
