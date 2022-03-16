// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Form } from 'antd';

import Link from '@meepshop/link';
import CheckoutSteps from '@store/checkout-steps';

import Login from './Login';
import Payment from './Payment';
import Discount from './Discount';
import Shipment from './Shipment';
import User from './User';
import Receiver from './Receiver';
import Buttons from './Buttons';
import Products from './Products';
import Total from './Total';
import useInitialValues from './hooks/useInitialValues';
import useValuesChange from './hooks/useValuesChange';
import useCarts from './hooks/useCarts';
import useComputeOrderList from './hooks/useComputeOrderList';
import styles from './styles/checkout.less';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { getViewerData } from './gqls/checkout';
import { useInitialValuesInCheckoutFragment } from './gqls/useInitialValues';
import { loginFragment } from './gqls/login';
import { paymentOrderFragment } from './gqls/payment';
import { discountFragment } from './gqls/discount';
import { userFragment } from './gqls/user';
import {
  receiverStoreFragment,
  receiverInCheckoutUserFragment,
} from './gqls/receiver';
import { productsFragment } from './gqls/products';
import { totalOrderFragment } from './gqls/total';

// definition
export default React.memo(() => {
  const [form] = Form.useForm();
  const { data } = useQuery(getViewerData);
  const initialValues = useInitialValues(
    form,
    useMemo(
      () => filter(useInitialValuesInCheckoutFragment, data?.viewer || null),
      [data],
    ),
  );
  const { computeOrderListData, computeOrderList } = useComputeOrderList(form);
  const isEmptyCart = useCarts(
    filter(useCartFragment, data?.viewer || null),
    computeOrderList,
  );
  const valuesChange = useValuesChange(computeOrderList);

  const isLogin = data?.viewer?.role === 'SHOPPER';

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValues}
      onValuesChange={valuesChange}
      scrollToFirstError
    >
      <div>
        <CheckoutSteps step="checkout" />

        {isLogin ? null : (
          <Login store={filter(loginFragment, data?.viewer?.store || null)} />
        )}

        <Payment
          computeOrderList={filter(
            paymentOrderFragment,
            computeOrderListData || null,
          )}
        />

        <Discount
          computeOrderList={filter(
            discountFragment,
            computeOrderListData || null,
          )}
        />

        <Shipment />

        <User
          isLogin={isLogin}
          store={filter(userFragment, data?.viewer?.store || null)}
        />

        <Receiver
          isLogin={isLogin}
          store={filter(receiverStoreFragment, data?.viewer?.store || null)}
          user={filter(receiverInCheckoutUserFragment, data?.viewer || null)}
        />

        <Buttons
          // loading={isChecking || isSubmitting}
          loading={false}
        />

        {data?.viewer?.store?.hiddingMeepshopMaxInFooterEnabled ? null : (
          <Link href="https://meepshop.cc/8h1kG" target="_blank">
            <div className={styles.footer}>meepShop MAX 極速開店</div>
          </Link>
        )}
      </div>

      <div>
        <Products
          // loading={cartLoading || (carts.length !== 0 && products.length === 0)}
          loading={false}
          isEmptyCart={isEmptyCart}
          computeOrderList={filter(
            productsFragment,
            computeOrderListData || null,
          )}
        />

        <Total
          computeOrderList={filter(
            totalOrderFragment,
            computeOrderListData || null,
          )}
        />
      </div>
    </Form>
  );
});
