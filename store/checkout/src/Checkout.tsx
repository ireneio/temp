// import
import React, { useMemo, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Form, Collapse } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
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
import useComputeOrderList from './hooks/useComputeOrderList';
import useCarts from './hooks/useCarts';
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
const { Panel } = Collapse;

export default React.memo(() => {
  const { t } = useTranslation('checkout');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const [form] = Form.useForm();
  const { data } = useQuery(getViewerData);
  const initialValues = useInitialValues(
    form,
    useMemo(
      () => filter(useInitialValuesInCheckoutFragment, data?.viewer || null),
      [data],
    ),
  );
  const {
    computeOrderListLoading,
    computeOrderListData,
    computeOrderList,
  } = useComputeOrderList(form);
  const { cartLoading, isEmptyCart } = useCarts(
    filter(useCartFragment, data?.viewer || null),
    computeOrderList,
  );
  const valuesChange = useValuesChange(computeOrderList);

  const isLogin = data?.viewer?.role === 'SHOPPER';

  return (
    <>
      <Form
        className={styles.root}
        form={form}
        initialValues={initialValues}
        onValuesChange={valuesChange}
        scrollToFirstError
      >
        <CheckoutSteps step="checkout" />

        {isLogin ? null : (
          <Login store={filter(loginFragment, data?.viewer?.store || null)} />
        )}

        <div className={styles.products}>
          <Collapse
            expandIcon={({ isActive }) =>
              isActive ? <UpCircleOutlined /> : <DownCircleOutlined />
            }
            bordered={false}
            defaultActiveKey="products"
          >
            <Panel
              key="products"
              header={
                <>
                  <p>{c(computeOrderListData?.priceInfo?.total || 0)}</p>
                  <div>{t('total-payment-amount')}</div>
                </>
              }
            >
              <Products
                loading={cartLoading || computeOrderListLoading}
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
            </Panel>
          </Collapse>
        </div>

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
          // loading={isSubmitting}
          loading={computeOrderListLoading}
        />

        {data?.viewer?.store?.hiddingMeepshopMaxInFooterEnabled ? null : (
          <Link href="https://meepshop.cc/8h1kG" target="_blank">
            <div className={styles.footer}>meepShop MAX 極速開店</div>
          </Link>
        )}
      </Form>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: ${styles.screenSmMax}) {
              .${styles.products} {
                box-shadow: 0px 0px 6px -2px ${transformColor(colors[3]).alpha(
                  0.15,
                )};
              }

              .${
                styles.products
              } > .ant-collapse > .ant-collapse-item > .ant-collapse-header {
                color: ${colors[3]};
                background-color: ${transformColor(colors[3]).alpha(0.05)};
              }

              .${
                styles.products
              } > .ant-collapse > .ant-collapse-item > .ant-collapse-header .anticon {
                color: ${transformColor(colors[3]).alpha(0.55)};
              }

              .${
                styles.products
              } > .ant-collapse > .ant-collapse-item > .ant-collapse-content-active {
                border-top: 1px solid ${transformColor(colors[5]).alpha(0.5)};
              }
            }
          `,
        }}
      />
    </>
  );
});
