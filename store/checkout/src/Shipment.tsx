// import
import React, { useContext } from 'react';
import { Form } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { Colors as ColorsContext } from '@meepshop/context';

import ChooseShipmentStore from './ChooseShipmentStore';
import styles from './styles/shipment.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const { push } = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div>{t('shipment')}</div>
        <div onClick={() => push('/cart#shipment')}>{t('change')}</div>
      </div>

      <FormItem dependencies={['shipment']} noStyle>
        {({ getFieldValue }) => (
          <div className={styles.description}>
            <div>{getFieldValue(['shipment'])?.name}</div>
            <div>{getFieldValue(['shipment'])?.description}</div>
          </div>
        )}
      </FormItem>

      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) =>
          !['allpay', 'ezship'].includes(
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
