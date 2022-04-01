// typescript import
import { NextPage } from 'next';

// import
import React, { useContext, useMemo } from 'react';
import { Form } from 'antd';
import { useQuery } from '@apollo/client';

import { Role as RoleContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';
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
import useScrollToError from './hooks/useScrollToError';
import useInitialValue from './hooks/useInitialValue';
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
import { useInitialValueFragment } from './gqls/useInitialValue';

// definition
const { Item: FormItem } = Form;

const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  const { data } = useQuery<getCartType>(getCart, {
    fetchPolicy: 'cache-and-network',
  });
  const viewer = data?.viewer || null;
  const computedCart = useComputedCart(filter(useComputedCartFragment, viewer));
  const initialLineItems = useMemo(
    () =>
      filter(useInitialValueFragment, computedCart?.computedLineItems || []),
    [computedCart],
  );
  const [form] = Form.useForm();
  const scrollToError = useScrollToError(form);
  const initialValue = useInitialValue(form, initialLineItems);
  const isEmpty = computedCart && !computedCart.computedLineItems.length;

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValue}
      scrollToFirstError
    >
      <div className={styles.wrapper}>
        <CheckoutSteps step="cart" />

        {!isEmpty ? null : <Empty />}

        {role !== 'GUEST' || isEmpty ? null : <Login />}

        {isEmpty ? null : (
          <>
            <FormItem shouldUpdate noStyle>
              {({ getFieldsError, getFieldValue }) => (
                <Alert
                  activeUpsellingArea={filter(
                    alertFragment,
                    viewer?.store?.activeUpsellingArea || null,
                  )}
                  getFieldValue={getFieldValue}
                  getFieldsError={getFieldsError}
                />
              )}
            </FormItem>

            <FormItem shouldUpdate noStyle>
              {({ getFieldsError }) => (
                <Products
                  viewer={filter(productsUserFragment, viewer)}
                  products={filter(
                    productsLineItemFragment,
                    computedCart?.computedLineItems || [],
                  )}
                  getFieldsError={getFieldsError}
                />
              )}
            </FormItem>
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

          <Footer scrollToError={scrollToError} />
        </div>
      )}
    </Form>
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
