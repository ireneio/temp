// typescript import
import { ValuesType } from './hooks/useInitialValue';

// import
import React, { useMemo, useCallback } from 'react';
import { Form } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Alert from '@store/alert';

import styles from './styles/alert.less';

// graphql import
import { alertFragment } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  activeUpsellingArea: alertFragment | null;
  products: ValuesType['products'];
  shipmentId: ValuesType['shipmentId'];
  hasErrors: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ activeUpsellingArea, products, shipmentId, hasErrors }: PropsType) => {
    const { t } = useTranslation('cart');
    const availableItems = useMemo(
      () =>
        !shipmentId
          ? products
          : products.filter(
              item =>
                (item.applicableShipments || []).findIndex(
                  shipment => shipment.id === shipmentId,
                ) > -1,
            ),
      [products, shipmentId],
    );
    const { isUpsellingOverLimit, isOnlyUpselling } = useMemo(
      () => ({
        isUpsellingOverLimit: availableItems.some(
          item => item?.status === 'EXCEED_LIMIT_PER_ORDER',
        ),
        isOnlyUpselling:
          availableItems.length > 0 &&
          !availableItems.some(item => item?.type === 'PRODUCT'),
      }),
      [availableItems],
    );
    const validator = useCallback(async () => {
      if (
        availableItems.length > 0 &&
        !availableItems.some(item => item?.type === 'PRODUCT')
      )
        throw new Error('isOnlyUpselling');
    }, [availableItems]);

    if (!activeUpsellingArea) return null;

    return (
      <>
        {!isUpsellingOverLimit ? null : (
          <Alert
            className={styles.error}
            type="error"
            message={t('alert.upselling-over-limit', {
              amount: activeUpsellingArea.limitPerOrder || 0,
            })}
            showIcon
          />
        )}

        <FormItem name={['products']} rules={[{ validator }]} noStyle hidden>
          <input type="hidden" />
        </FormItem>

        {!isOnlyUpselling ? null : (
          <Alert
            className={`${styles.error} ${hasErrors ? '' : styles.hidden}`}
            type="warning"
            message={t('alert.only-upselling')}
            showIcon
          />
        )}
      </>
    );
  },
);
