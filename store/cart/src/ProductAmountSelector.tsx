// typescript import
import { ValuesType } from './hooks/useInitialValue';

// import
import React, { useCallback } from 'react';
import { Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { useCart } from '@meepshop/hooks';
import ProductAmountSelector from '@meepshop/product-amount-selector';
import filter from '@meepshop/utils/lib/filter';

import styles from './styles/productAmountSelector.less';

// graphql typescript
import {
  productAmountSelectorLineItemFragment as productAmountSelectorLineItemFragmentType,
  productAmountSelectorUserFragment as productAmountSelectorUserFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface PropsType {
  viewer: productAmountSelectorUserFragmentType | null;
  lineItem: productAmountSelectorLineItemFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    viewer,
    lineItem: {
      productId,
      variantId,
      status,
      quantity,
      variant,
      applicableShipments,
    },
  }: PropsType) => {
    const { t } = useTranslation('cart');
    const { upsertCart } = useCart(filter(useCartFragment, viewer));
    const validator = useCallback(async () => {
      if (!['PURCHASABLE'].includes(status)) {
        throw new Error(status);
      }
    }, [status]);

    return (
      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const products: ValuesType['products'] = getFieldValue(['products']);
          const shipmentId: ValuesType['shipmentId'] = getFieldValue([
            'shipmentId',
          ]);
          const index = products.findIndex(
            product => product.variantId === variantId,
          );
          const available =
            !shipmentId ||
            Boolean(
              applicableShipments?.find(shipment => shipment.id === shipmentId),
            );

          if (
            ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(status)
          )
            return (
              <div
                className={`${styles.error} ${!available ? styles.fix : ''}`}
              >
                <ExclamationCircleOutlined />

                <FormItem shouldUpdate noStyle>
                  {({ getFieldError }) =>
                    getFieldError(['products', index, 'status']).length
                      ? t(`${status}-warning`)
                      : t(status)
                  }
                </FormItem>

                {index < 0 || !available ? null : (
                  <FormItem
                    name={['products', index, 'status']}
                    rules={[{ validator }]}
                    noStyle
                    hidden
                  >
                    <input type="hidden" />
                  </FormItem>
                )}
              </div>
            );

          return (
            <>
              <ProductAmountSelector
                value={quantity || 0}
                size="large"
                className={`${styles.root} ${
                  status !== 'PURCHASABLE' && available ? styles.error : ''
                }`}
                variant={variant}
                onChange={newQuantity => {
                  upsertCart({
                    __typename: 'CartItem' as const,
                    productId,
                    quantity: newQuantity - (quantity || 0),
                    variantId,
                  });
                }}
              />

              {!['LIMIT_EXCEEDED', 'MINIMUM_NOT_REACHED'].includes(
                status,
              ) ? null : (
                <div
                  className={`${styles.amountError} ${
                    !available ? styles.fix : ''
                  }`}
                >
                  {t(status)}
                </div>
              )}

              {index < 0 || !available ? null : (
                <FormItem
                  name={['products', index, 'status']}
                  rules={[{ validator }]}
                  noStyle
                  hidden
                >
                  <input type="hidden" />
                </FormItem>
              )}
            </>
          );
        }}
      </FormItem>
    );
  },
);
