// typescript import
import { MutationFunction } from '@apollo/react-common';
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
import useCreateOrder from './hooks/useCreateOrder';
import useComputeOrder from './hooks/useComputeOrder';
import useSubmit from './hooks/useSubmit';

// graphql typescript
import {
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
} from './gqls/__generated__/createOrderInLandingPage';
import { landingPageLandingPageModuleFragment } from './gqls/__generated__/landingPageLandingPageModuleFragment';
import { receiverFragment as receiverFragmentType } from './receiver/gqls/__generated__/receiverFragment';
import { shoppingLandingPageModuleFragment as shoppingLandingPageModuleFragmentType } from './gqls/__generated__/shoppingLandingPageModuleFragment';

// graphql import
import { receiverFragment } from './receiver/gqls';
import {
  shoppingLandingPageModuleFragment,
  shoppingOrderFragment,
} from './gqls/shopping';
import { priceFragment } from './gqls/price';
import { useSubmitFragment } from './gqls/useSubmit';

// typescript definition
export interface PropsType
  extends landingPageLandingPageModuleFragment,
    FormComponentProps {}

// definition
export const LandingPageWrapper = React.memo(
  ({
    children,
  }: {
    children: (props: {
      createOrderInLandingPage: MutationFunction<
        createOrderInLandingPageType,
        createOrderInLandingPageVariables
      >;
    }) => React.ReactElement;
  }) => {
    const { createOrderInLandingPage } = useCreateOrder();
    return children({ createOrderInLandingPage });
  },
);

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
      redirectPage,
      viewer,
    } = props;

    const { t } = useTranslation('landing-page');
    const adTrack = useContext(AdTrackContext);
    const colors = useContext(ColorsContext);
    // TODO: combine useCreateOrder and useSubmit after removing LandingPageWrapper
    const { createOrderInLandingPage, isCreatingOrder } = useCreateOrder();
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
    const onSubmit = useSubmit({
      viewer,
      product,
      redirectPage,
      form,
      createOrderInLandingPage,
      isCreatingOrder,
      order: filter(useSubmitFragment, order),
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
              {...filter<receiverFragmentType, PropsType>(
                receiverFragment,
                props,
              )}
              form={form}
              viewer={viewer}
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
              loading={isCreatingOrder}
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
