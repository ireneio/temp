// typescript import
import { FormInstance } from 'antd/lib/form';

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
interface PropsType
  extends Pick<FormInstance, 'getFieldValue' | 'getFieldsError'> {
  activeUpsellingArea: alertFragment | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ activeUpsellingArea, getFieldValue, getFieldsError }: PropsType) => {
    const { t } = useTranslation('cart');
    const products: ValuesType['products'] = getFieldValue(['products']);
    const error = getFieldsError();
    const { isUpsellingOverLimit, isOnlyUpselling, hasErrors } = useMemo(() => {
      return {
        isUpsellingOverLimit: products.some(
          item => item?.status === 'EXCEED_LIMIT_PER_ORDER',
        ),
        isOnlyUpselling:
          products.length > 0 &&
          !products.some(item => item?.type === 'PRODUCT'),
        hasErrors: error.some(({ errors }) => errors.length),
      };
    }, [products, error]);
    const validator = useCallback(
      async (_, lineItems: ValuesType['products']) => {
        if (
          lineItems.length > 0 &&
          !lineItems.some(item => item?.type === 'PRODUCT')
        )
          throw new Error('isOnlyUpselling');
      },
      [],
    );

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
