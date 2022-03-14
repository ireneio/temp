// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import { Role as RoleContext } from '@meepshop/context';
import CheckoutSteps from '@store/checkout-steps';

// Use to copy mixin.less
import './styles/mixin.less';
import Empty from './Empty';
import Login from './Login';
import Alert from './Alert';
import Products from './Products';
import Price from './Price';
import Footer from './Footer';
import Upselling from './upselling';
import useComputedCart from './hooks/useComputedCart';
import useCheckErrors from './hooks/useCheckErrors';
import styles from './styles/index.less';

// graphql typescript
import { getCart as getCartType } from '@meepshop/types/gqls/store';

// graphql import
import { getCart } from './gqls';
import { alertFragment } from './gqls/alert';
import {
  productsUserFragment,
  productsLineItemFragment,
} from './gqls/products';
import { priceComputedCartFragment } from './gqls/price';
import {
  upsellingUserFragment,
  upsellingLineItemFragment,
} from './upselling/gqls';
import { useComputedCartFragment } from './gqls/useComputedCart';
import { useCheckErrorsFragment } from './gqls/useCheckErrors';

// definition
const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  const { data } = useQuery<getCartType>(getCart);
  const viewer = data?.viewer || null;
  const computedCart = useComputedCart(filter(useComputedCartFragment, viewer));
  const {
    isUpsellingOverLimit,
    isOnlyUpselling,
    hasError,
    checkErrors,
  } = useCheckErrors({
    lineItems: filter(
      useCheckErrorsFragment,
      computedCart?.computedLineItems || [],
    ),
  });

  const isEmpty = computedCart && !computedCart.computedLineItems.length;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <CheckoutSteps step="cart" />

        {!isEmpty ? null : <Empty />}

        {role !== 'GUEST' || isEmpty ? null : <Login />}

        {isEmpty ? null : (
          <>
            <Alert
              activeUpsellingArea={filter(
                alertFragment,
                viewer?.store?.activeUpsellingArea || null,
              )}
              isUpsellingOverLimit={isUpsellingOverLimit}
              isOnlyUpselling={isOnlyUpselling}
              hasError={hasError}
            />

            <Products
              viewer={filter(productsUserFragment, viewer)}
              products={filter(
                productsLineItemFragment,
                computedCart?.computedLineItems || [],
              )}
              hasError={hasError}
            />
          </>
        )}
      </div>

      {!viewer?.store?.activeUpsellingArea ||
      !viewer.store.activeUpsellingArea.products.length ? null : (
        <Upselling
          viewer={filter(upsellingUserFragment, viewer)}
          cartItems={filter(
            upsellingLineItemFragment,
            computedCart?.computedLineItems || [],
          )}
        />
      )}

      {isEmpty ? null : (
        <div className={styles.wrapper}>
          <Price
            computedCart={filter(priceComputedCartFragment, computedCart)}
          />

          <Footer checkErrors={checkErrors} />
        </div>
      )}
    </div>
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
