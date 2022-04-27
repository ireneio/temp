// typescript import
import { NextPage } from 'next';

// import
import React, { useContext, useState } from 'react';
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
import Shipment from './Shipment';
import Price from './Price';
import Footer from './Footer';
import Upselling from './upselling';
import useComputedCart from './hooks/useComputedCart';
import useGoToCheckout from './hooks/useGoToCheckout';
import useInitialValue from './hooks/useInitialValue';
import useValuesChange from './hooks/useValuesChange';
import useShipments from './hooks/useShipments';
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
import { useShipmentsFragment } from './gqls/useShipments';

// definition
const { Item: FormItem } = Form;

const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  const [form] = Form.useForm();
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const { data } = useQuery<getCartType>(getCart, {
    fetchPolicy: 'cache-and-network',
  });
  const viewer = data?.viewer || null;
  const { computedCart, refetch, variables, loading } = useComputedCart(
    form,
    filter(useComputedCartFragment, viewer),
  );
  const computedLineItems = computedCart?.computedLineItems || [];
  const shipments = useShipments(
    filter(useShipmentsFragment, computedLineItems),
  );
  const goToCheckout = useGoToCheckout(form, loading);
  const initialValue = useInitialValue(
    form,
    filter(useInitialValueFragment, computedLineItems),
  );
  const valuesChange = useValuesChange({ refetch, variables });
  const isEmpty = computedCart && !computedLineItems.length;

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValue}
      onValuesChange={valuesChange}
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
                  products={getFieldValue(['products'])}
                  hasErrors={getFieldsError().some(
                    ({ errors }) => errors.length,
                  )}
                />
              )}
            </FormItem>

            <FormItem shouldUpdate noStyle>
              {({ getFieldsError }) => (
                <Products
                  viewer={filter(productsUserFragment, viewer)}
                  products={filter(productsLineItemFragment, computedLineItems)}
                  hasErrors={getFieldsError().some(
                    ({ errors }) => errors.length,
                  )}
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
          cartItems={filter(upsellingLineItemFragment, computedLineItems)}
        />
      )}

      {isEmpty ? null : (
        <>
          <div className={styles.shipment} id="shipment">
            <Shipment loading={loading} shipments={shipments} />

            <Price
              computedCart={filter(priceComputedCartFragment, computedCart)}
              showFooter={showFooter}
              setShowFooter={setShowFooter}
            />
          </div>

          <Footer
            loading={loading}
            showFooter={showFooter}
            goToCheckout={goToCheckout}
          />
        </>
      )}
    </Form>
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
