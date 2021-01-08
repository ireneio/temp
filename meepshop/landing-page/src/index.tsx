// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useEffect, useContext } from 'react';
import { Form, Divider, Button } from 'antd';
import { filter } from 'graphql-anywhere';

import {
  AdTrack as AdTrackContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import GmoCreditCardForm from '@meepshop/gmo-credit-card-form';

// Use to copy mixin.less
import './styles/mixin.less';

import Price from './Price';
import Shopping from './Shopping';
import Receiver from './receiver';
import styles from './styles/index.less';
import useComputeOrder from './hooks/useComputeOrder';
import useSubmit from './hooks/useSubmit';

// graphql typescript
import { landingPageLandingPageModuleFragment } from './gqls/__generated__/landingPageLandingPageModuleFragment';
import { receiverLandingPageModuleFragment as receiverLandingPageModuleFragmentType } from './receiver/gqls/__generated__/receiverLandingPageModuleFragment';
import { shoppingLandingPageModuleFragment as shoppingLandingPageModuleFragmentType } from './gqls/__generated__/shoppingLandingPageModuleFragment';
import { useSubmitLandingPageModuleFragment as useSubmitLandingPageModuleFragmentType } from './gqls/__generated__/useSubmitLandingPageModuleFragment';

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
  useSubmitUserFragment,
  useSubmitLandingPageModuleFragment,
  useSubmitOrderFragment,
} from './gqls/useSubmit';

// typescript definition
export interface PropsType
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
      ...filter<useSubmitLandingPageModuleFragmentType, PropsType>(
        useSubmitLandingPageModuleFragment,
        props,
      ),
      viewer: filter(useSubmitUserFragment, viewer),
      order: filter(useSubmitOrderFragment, order),
      form,
      payment,
    });

    const { getFieldsError, validateFieldsAndScroll } = form;

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
              {...filter<receiverLandingPageModuleFragmentType, PropsType>(
                receiverLandingPageModuleFragment,
                props,
              )}
              viewer={filter(receiverUserFragment, viewer)}
              form={form}
              shipment={shipment}
            />

            {payment?.template !== 'gmo' ||
            payment?.accountInfo?.gmo?.paymentType !== 'Credit' ? null : (
              <GmoCreditCardForm
                storePaymentId={
                  payment.paymentId || 'null-id' /** SHOULD_NOT_BE_NULL */
                }
                isInstallment={payment.accountInfo.gmo.isInstallment || false}
                form={form}
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
