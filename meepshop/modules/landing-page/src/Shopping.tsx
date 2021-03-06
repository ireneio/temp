// typescript import
import { FormInstance } from 'antd';
import { UseComputeOrderType } from './hooks/useComputeOrder';

// import
import React, { useContext } from 'react';
import { Cascader, Collapse, Form, Input } from 'antd';
import transformColor from 'color';

import ProductAmountSelector from '@meepshop/product-amount-selector';
import {
  AdTrack as AdTrackContext,
  Apps as AppsContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';
import Select, { Option } from '@meepshop/select';

import CouponStatus from './CouponStatus';
import useVariantOptions from './hooks/useVariantOptions';
import styles from './styles/shopping.less';

// graphql typescript
import {
  shoppingLandingPageModuleFragment,
  shoppingLandingPageModuleFragment_product as shoppingLandingPageModuleFragmentProduct,
  shoppingOrderFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';

import { couponStatusFragment } from './gqls/couponStatus';

// typescript definition
interface PropsType
  extends shoppingLandingPageModuleFragment,
    Omit<UseComputeOrderType, 'order'> {
  order: shoppingOrderFragment | null;
  form: FormInstance;
  product: shoppingLandingPageModuleFragmentProduct;
}

// definition
const { Item } = Form;
const { Panel } = Collapse;

export default React.memo(
  ({
    form,
    product,
    quantity,
    order,
    payment,
    payments,
    shipment,
    shipments,
    computeOrder,
  }: PropsType) => {
    const { t } = useTranslation('landing-page');
    const adTrack = useContext(AdTrackContext);
    const apps = useContext(AppsContext);
    const colors = useContext(ColorsContext);
    const variantOptions = useVariantOptions(product);

    const { getFieldValue } = form;
    const { title, variants } = product;
    const variant =
      variants?.find(
        _variant => _variant?.id === getFieldValue('variantId')?.slice(-1)[0],
      ) || null;

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{t('select-product-payment')}</h3>
        <Item
          className={styles.formItem}
          name={['variantId']}
          rules={[
            {
              type: 'array',
              required: true,
              message: t('select-product'),
            },
          ]}
        >
          <Cascader
            placeholder={t('select-product')}
            options={variantOptions}
            disabled={!variantOptions}
            displayRender={label =>
              label.length === 0
                ? ''
                : `${title?.zh_TW || ''} ${label.join(' / ')}`
            }
            allowClear={false}
            onChange={value => {
              if (quantity?.required) return;

              const newVariant =
                variants?.find(_variant => _variant?.id === value[0]) || null;

              if (!newVariant) return;

              // SHOULD_NOT_BE_NULL
              adTrack.addToCart({
                eventName: 'lp',
                id: product.id || 'null-id',
                title: product.title,
                quantity: 1,
                specs: newVariant.specs,
                price: newVariant.totalPrice || 0,
              });
            }}
          />
        </Item>

        {!quantity?.required ? null : (
          <Item
            className={styles.formItem}
            name={['quantity']}
            rules={[
              {
                required: true,
                type: 'number',
                message: t('is-required'),
              },
            ]}
          >
            <ProductAmountSelector
              variant={filter(productAmountSelectorFragment, variant)}
              onChange={(value: number) => {
                if (!variant) return;

                // SHOULD_NOT_BE_NULL
                adTrack.addToCart({
                  eventName: 'lp',
                  id: product.id || 'null-id',
                  title: product.title,
                  quantity: value,
                  specs: variant.specs,
                  price: variant.totalPrice || 0,
                });
              }}
            />
          </Item>
        )}

        <Item
          className={styles.formItem}
          name={['paymentId']}
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
          ]}
        >
          <Select placeholder={t('payment')} disabled={payments.length === 0}>
            {payments.map(({ paymentId: id, name }) => (
              <Option
                key={id || 'null-id' /* SHOULD_NOT_BE_NULL */}
                value={id || ''}
              >
                {name}
              </Option>
            ))}
          </Select>

          {!payment ? null : (
            <Collapse className={styles.collapse} bordered={false}>
              <Panel
                key="payment-description"
                header={t('payment-description')}
                className={styles.panel}
              >
                <pre>{payment.description}</pre>
              </Panel>
            </Collapse>
          )}
        </Item>

        <Item
          className={styles.formItem}
          name={['shipmentId']}
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
          ]}
        >
          <Select placeholder={t('shipment')} disabled={shipments.length === 0}>
            {shipments.map(({ shipmentId: id, name }) => (
              <Option
                key={id || 'null-id' /* SHOULD_NOT_BE_NULL */}
                value={id || ''}
              >
                {name}
              </Option>
            ))}
          </Select>

          {!shipment ? null : (
            <Collapse className={styles.collapse} bordered={false}>
              <Panel
                key="shipment-description"
                header={t('shipment-description')}
                className={styles.panel}
              >
                <pre>{shipment.description}</pre>
              </Panel>
            </Collapse>
          )}
        </Item>

        {!apps.coupon.isInstalled ? null : (
          <Item
            className={styles.formItem}
            help={<CouponStatus order={filter(couponStatusFragment, order)} />}
            validateStatus={order?.errorObj ? 'success' : ''}
            name={['coupon']}
          >
            <Input
              placeholder={t('coupon.placeholder')}
              onBlur={e => computeOrder(e.target.value)}
            />
          </Item>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.title} {
              border-bottom: 1px solid ${colors[5]};
            }

            .${styles.panel} {
              background: ${transformColor(colors[5]).alpha(0.15)};
            }
          `,
          }}
        />
      </div>
    );
  },
);
