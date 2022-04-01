// import
import React from 'react';
import { Form } from 'antd';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';
import Radio from '@store/radio';
import Alert from '@store/alert';

import useShipmentOptions from './hooks/useShipmentOptions';
import styles from './styles/shipment.less';

// graphql typescript
import { useShipmentOptionsFragment as useShipmentOptionsFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useShipmentOptionsFragment } from './gqls/useShipmentOptions';

// typscript definition
interface PropsType {
  storeShipments: useShipmentOptionsFragmentType[];
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ storeShipments }: PropsType) => {
  const { t } = useTranslation('cart');
  const options = useShipmentOptions(
    filter(useShipmentOptionsFragment, storeShipments),
  );

  return (
    <div className={styles.root}>
      <div className={styles.blockTitle}>{t('shipment.title')}</div>

      <FormItem noStyle dependencies={['shipment']}>
        {({ getFieldError }) =>
          !getFieldError(['shipment']).length ? null : (
            <Alert type="error" message={getFieldError(['shipment'])} />
          )
        }
      </FormItem>

      {!options.length ? (
        <Alert type="error" message={t('shipment.alert-tip-2')} />
      ) : (
        <FormItem
          className={styles.group}
          name={['shipment']}
          rules={[{ required: true, message: t('shipment.alert-tip-1') }]}
        >
          <Radio options={options} />
        </FormItem>
      )}
    </div>
  );
});
