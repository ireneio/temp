// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Form, Collapse } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import transformColor from 'color';

import filter from '@meepshop/utils/lib/filter';
import { useTranslation } from '@meepshop/locales';
import GmoCreditCardForm from '@meepshop/form-gmo-credit-card';
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
import useSave from './hooks/useSave';
import useComputeOrderList from './hooks/useComputeOrderList';
import styles from './styles/index.less';

// graphql typescript
import {
  getViewerData as getViewerDataType,
  getViewerDataVariables as getViewerDataVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getViewerData } from './gqls';
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
import { useSaveUserFragment } from './gqls/useSave';

// definition
const { Item: FormItem } = Form;
const { Panel } = Collapse;

export default React.memo(() => {
  const { t } = useTranslation('checkout');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const [form] = Form.useForm();
  const { data } = useQuery<getViewerDataType, getViewerDataVariablesType>(
    getViewerData,
    {
      variables: {
        first: 10,
      },
    },
  );
  const isLogin = data?.viewer?.role === 'SHOPPER';
  const initialValues = useInitialValues(
    form,
    filter(useInitialValuesInCheckoutFragment, data?.viewer || null),
  );
  const {
    computeOrderListLoading,
    computeOrderListData,
    computeOrderList,
  } = useComputeOrderList(form, initialValues);
  const { loading, save } = useSave({
    isLogin,
    computeOrderListLoading,
    viewer: filter(useSaveUserFragment, data?.viewer || null),
  });
  const valuesChange = useValuesChange(computeOrderList);

  return (
    <>
      <Form
        className={styles.root}
        form={form}
        initialValues={initialValues}
        onValuesChange={valuesChange}
        onFinish={save}
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
                loading={computeOrderListLoading}
                isEmptyCart={!initialValues.products?.length}
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
          loading={computeOrderListLoading}
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

        <div>
          <FormItem dependencies={['paymentId']} noStyle>
            {({ getFieldValue }) => {
              const payment = getFieldValue(['payment']);

              return !payment?.paymentId ||
                payment?.template !== 'gmo' ||
                payment?.accountInfo?.gmo?.paymentType !== 'Credit' ? null : (
                <GmoCreditCardForm
                  storePaymentId={payment?.paymentId}
                  isInstallment={
                    payment?.accountInfo.gmo.isInstallment || false
                  }
                  rememberCardNumber={
                    payment?.accountInfo.gmo.rememberCardNumber || false
                  }
                />
              );
            }}
          </FormItem>
        </div>

        <Buttons loading={computeOrderListLoading || loading} />

        {data?.viewer?.store?.hiddingMeepshopMaxInFooterEnabled ? null : (
          <Link href="https://meepshop.cc/8h1kG" target="_blank">
            <div className={styles.footer}>meepShop 極速開店</div>
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
