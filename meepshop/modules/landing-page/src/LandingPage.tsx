// typescript import
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';

// import
import React, { useEffect, useContext, useState } from 'react';
import { Form } from '@ant-design/compatible';
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
import useSubmit from './hooks/useSubmit';

// graphql typescript
import {
  landingPageLandingPageModuleFragment,
  receiverLandingPageModuleFragment as receiverLandingPageModuleFragmentType,
  shoppingLandingPageModuleFragment as shoppingLandingPageModuleFragmentType,
  useSubmitLandingPageModuleFragment as useSubmitLandingPageModuleFragmentType,
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
  useSubmitLandingPageModuleFragment,
  useSubmitOrderFragment,
} from './gqls/useSubmit';

// typescript definition
interface PropsType
  extends landingPageLandingPageModuleFragment,
    FormComponentProps {}

// definition
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
export default Form.create<PropsType>()(
  React.memo((props: PropsType) => {
    const {
      id,
      width,
      form,
      product,
      quantity,
      storePayments,
      storeShipments,
      agreedMatters,
      viewer,
    } = props;

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
    const { loading, onSubmit } = useSubmit({
      landingPageModule: filter<
        useSubmitLandingPageModuleFragmentType,
        PropsType
      >(useSubmitLandingPageModuleFragment, props),
      order: filter(useSubmitOrderFragment, order),
      payment,
      form,
    });

    const { getFieldValue, getFieldsError, validateFieldsAndScroll } = form;

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
          onSubmit={onSubmit}
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
              receiver={filter<
                receiverLandingPageModuleFragmentType,
                PropsType
              >(receiverLandingPageModuleFragment, props)}
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
              />
            )}
          </div>

          <Divider className={styles.divider}>{t('agreement')}</Divider>

          <div>
            <pre className={styles.agreement}>{agreedMatters}</pre>

            <Button
              className={styles.submit}
              type="primary"
              htmlType="submit"
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
              onClick={() => validateFieldsAndScroll()}
              loading={loading}
            >
              {t('agree-submit')}
            </Button>
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
  }),
);
