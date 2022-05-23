// typescript import
import { FormInstance } from 'antd';

// import
import React, { useEffect, useContext, useState } from 'react';
import { Form } from 'antd';

import { Divider, Button } from 'antd';

import {
  AdTrack as AdTrackContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import LoginModal from '@meepshop/login-modal';
import GmoCreditCardForm from '@meepshop/gmo-credit-card-form';
import filter from '@meepshop/utils/lib/filter';

// Use to copy mixin.less
import './styles/mixin.less';

import Price from './Price';
import Shopping from './Shopping';
import Receiver from './receiver';
import styles from './styles/index.less';
import useComputeOrder from './hooks/useComputeOrder';
import useFinish from './hooks/useFinish';

// graphql typescript
import {
  landingPageLandingPageModuleFragment,
  receiverLandingPageModuleFragment as receiverLandingPageModuleFragmentType,
  shoppingLandingPageModuleFragment as shoppingLandingPageModuleFragmentType,
  useFinishLandingPageModuleFragment as useFinishLandingPageModuleFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  receiverUserFragment,
  receiverLandingPageModuleFragment,
} from './receiver/gqls';
import {
  shoppingLandingPageModuleFragment,
  shoppingOrderFragment,
} from './gqls/shopping';
import { priceFragment } from './gqls/price';
import {
  useFinishLandingPageModuleFragment,
  useFinishOrderFragment,
} from './gqls/useFinish';

// typescript definition
interface PropsType
  extends landingPageLandingPageModuleFragment,
    FormInstance {}

// definition
export default React.memo((props: PropsType) => {
  const {
    id,
    width,
    product,
    quantity,
    storePayments,
    storeShipments,
    agreedMatters,
    viewer,
  } = props;
  const { Item: FormItem } = Form;
  const [form] = Form.useForm();
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation('landing-page');
  const adTrack = useContext(AdTrackContext);
  const colors = useContext(ColorsContext);
  const {
    computeOrder,
    order,
    payment,
    payments,
    shipment,
    shipments,
  } = useComputeOrder(
    form,
    storePayments,
    storeShipments,
    product?.id,
    Boolean(quantity?.required),
  );

  const { loading, onFinish } = useFinish({
    landingPageModule: filter<
      useFinishLandingPageModuleFragmentType,
      PropsType
    >(useFinishLandingPageModuleFragment, props),
    order: filter(useFinishOrderFragment, order),
    payment,
    form,
  });

  const { getFieldValue, getFieldsError, scrollToField } = form;

  useEffect(() => {
    setTimeout(() => {
      if (!product) return;

      // SHOULD_NOT_BE_NULL
      adTrack.viewProduct({
        id: product.id || 'null-id',
        title: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: product.title?.zh_TW || 'null-title',
        },
        price: product.variants?.[0]?.totalPrice?.toString() || 'null',
      });
    }, 5000);
  }, [product, adTrack]);

  if (!product) return null;

  return (
    <>
      <Form
        id={`landing-page-${id}`}
        className={styles.root}
        form={form}
        onFinish={onFinish}
        onFinishFailed={({ errorFields }) => {
          scrollToField(errorFields[0].name);
        }}
      >
        <div>
          <Shopping
            {...filter<shoppingLandingPageModuleFragmentType, PropsType>(
              shoppingLandingPageModuleFragment,
              props,
            )}
            product={product}
            form={form}
            order={filter(shoppingOrderFragment, order)}
            payment={payment}
            payments={payments}
            shipment={shipment}
            shipments={shipments}
            computeOrder={computeOrder}
          />
          <Price order={filter(priceFragment, order)} />
          <Receiver
            form={form}
            receiver={filter<receiverLandingPageModuleFragmentType, PropsType>(
              receiverLandingPageModuleFragment,
              props,
            )}
            viewer={filter(receiverUserFragment, viewer)}
            shipment={shipment}
          />
          {payment?.template !== 'gmo' ||
          payment?.accountInfo?.gmo?.paymentType !== 'Credit' ? null : (
            <GmoCreditCardForm
              storePaymentId={
                payment.paymentId || 'null-id' /** SHOULD_NOT_BE_NULL */
              }
              isInstallment={payment.accountInfo.gmo.isInstallment || false}
              rememberCardNumber={
                payment.accountInfo.gmo.rememberCardNumber || false
              }
            />
          )}
        </div>

        <Divider className={styles.divider}>{t('agreement')}</Divider>

        <div>
          <pre className={styles.agreement}>{agreedMatters}</pre>
          <FormItem shouldUpdate noStyle>
            <Button
              className={styles.submit}
              type="primary"
              htmlType="submit"
              disabled={getFieldsError().some(
                ({ errors }) => errors.length !== 0,
              )}
              loading={loading}
            >
              {t('agree-submit')}
            </Button>
          </FormItem>
        </div>
      </Form>

      {viewer?.role === 'SHOPPER' || !showLogin ? null : (
        <LoginModal
          initialEmail={getFieldValue('userEmail')}
          onClose={() => setShowLogin(false)}
        />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
              #landing-page-${id} > div {
                width: ${width}%;
              }

              #landing-page-${id} .ant-form-item-control:not(.has-error) .ant-cascader-picker .ant-cascader-input.ant-input,
              #landing-page-${id} .ant-form-item-control:not(.has-error) .ant-select .ant-select-selection--single,
              #landing-page-${id} .ant-form-item-control:not(.has-error) input.ant-input,
              #landing-page-${id} .ant-form-item-control:not(.has-error) .ant-input-number,
              #landing-page-${id} .ant-form-item-control:not(.has-error) textarea.ant-input {
                border: 1px solid ${colors[5]};
              }

              #landing-page-${id} .ant-input-search button {
                color: ${colors[2]};
                background: ${colors[4]};
                border-color: ${colors[4]};
              }

              #landing-page-${id} .ant-divider-horizontal.ant-divider-with-text:before, .ant-divider-horizontal.ant-divider-with-text:after {
                border-top: 1px solid ${colors[5]};
              }

              .${styles.agreement} {
                border: 1px solid ${colors[5]};
              }

              .${styles.submit} {
                color: ${colors[2]};
                border-color: ${colors[4]};
                background: ${colors[4]};
              }
            `,
        }}
      />
    </>
  );
});
