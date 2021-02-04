// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

import { UseComputeOrderType } from '../hooks/useComputeOrder';

// graphql typescript
import {
  ConvenienceStoreShipmentTypeEnum,
  ConvenienceStoreTypeEnum,
} from '@meepshop/types/gqls/meepshop';

// import
import React, { useState, useContext } from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import ConvenienceStoreMap from '@meepshop/convenience-store-map';

import styles from './styles/store.less';
import {
  SHIPMENT_STORE_FIELDS,
  CONVENIENCE_STORE_FIELDS,
  ECPAY_SHIPMENT_TYPE_ENUM,
  ECPAY_CONVENIENCE_STORE_TYPE_ENUM,
  EZSHIP_CONVENIENCE_STORE_TYPE_ENUM,
} from './constants';

// definition
const { Item } = Form;

export default React.memo(
  ({
    form,
    shipment,
  }: {
    form: FormComponentProps['form'];
    shipment: UseComputeOrderType['shipment'];
  }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const { t } = useTranslation('landing-page');
    const colors = useContext(ColorsContext);

    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    return (
      <>
        <Button
          className={styles.root}
          type="primary"
          onClick={() => setIsMapOpen(true)}
        >
          {SHIPMENT_STORE_FIELDS.map(field => getFieldValue(field)).some(
            value => value,
          )
            ? t('rechoose-store')
            : t('choose-store')}
        </Button>

        {SHIPMENT_STORE_FIELDS.map(field =>
          !getFieldValue(field) ? null : (
            <div
              key={getFieldValue(field)}
              className={styles.convenienceStoreInfo}
            >
              {t(`convenience-store.${field}`)}：{getFieldValue(field)}
            </div>
          ),
        )}

        {SHIPMENT_STORE_FIELDS.map((fieldName, index) => (
          <Item key={fieldName} className={styles.hideFormItem}>
            {getFieldDecorator(fieldName, {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message: index !== 0 ? ' ' : t('not-choose-store'),
                },
              ],
            })(<Input type="hidden" />)}
          </Item>
        ))}

        {CONVENIENCE_STORE_FIELDS.map(fieldName => (
          <Item key={fieldName} className={styles.hideFormItem}>
            {getFieldDecorator(fieldName)(<Input type="hidden" />)}
          </Item>
        ))}

        {!isMapOpen ? null : (
          <ConvenienceStoreMap
            shipmentType={
              (shipment?.template === 'allpay'
                ? ECPAY_SHIPMENT_TYPE_ENUM(
                    shipment.storeShipmentDetails?.accountInfo?.allpay
                      ?.logisticsSubType || '',
                  )
                : 'EZSHIP') as ConvenienceStoreShipmentTypeEnum
            }
            storeTypes={
              (shipment?.template === 'allpay'
                ? ECPAY_CONVENIENCE_STORE_TYPE_ENUM(
                    shipment.storeShipmentDetails?.accountInfo?.allpay
                      ?.logisticsSubType || '',
                  )
                : EZSHIP_CONVENIENCE_STORE_TYPE_ENUM) as ConvenienceStoreTypeEnum[]
            }
            close={() => setIsMapOpen(false)}
            confirmStore={store => {
              setFieldsValue(store);
              setIsMapOpen(false);
            }}
          />
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.root} {
              color: ${colors[2]};
              border-color: ${colors[4]};
              background: ${colors[4]};
            }
          `,
          }}
        />
      </>
    );
  },
);
