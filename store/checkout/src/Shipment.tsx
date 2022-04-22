// import
import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import transformColor from 'color';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { Colors as ColorsContext } from '@meepshop/context';

import ChooseShipmentStore from './ChooseShipmentStore';
import { CONVENIENCE_STORE_SHIPMENT } from './constants';
import styles from './styles/shipment.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('checkout');
  const getLanguage = useGetLanguage();
  const colors = useContext(ColorsContext);
  const { push } = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div>{t('shipment')}</div>
        <div onClick={() => push('/cart#shipment')}>{t('change')}</div>
      </div>

      <FormItem name={['shipment']} noStyle>
        <Input type="hidden" />
      </FormItem>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) => (
          <div className={styles.description}>
            <div>{getLanguage(getFieldValue(['shipment'])?.title)}</div>
            <pre>{getLanguage(getFieldValue(['shipment'])?.description)}</pre>
          </div>
        )}
      </FormItem>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) =>
          !CONVENIENCE_STORE_SHIPMENT.includes(
            getFieldValue(['shipment'])?.template,
          ) ? null : (
            <ChooseShipmentStore
              shipment={getFieldValue(['shipment']) || null}
            />
          )
        }
      </FormItem>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.description} {
              background-color: ${transformColor(colors[3]).alpha(0.03)};
            }
          `,
        }}
      />
    </div>
  );
});
