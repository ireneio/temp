// typescript import

import { UseComputeOrderType } from '../hooks/useComputeOrder';

// graphql typescript
import {
  ConvenienceStoreShipmentTypeEnum,
  ConvenienceStoreTypeEnum,
} from '@meepshop/types/gqls/meepshop';

// import
import React, { useState, useContext } from 'react';
import { Button, Input, Form, FormInstance } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import ConvenienceStoreMap from '@meepshop/form-convenience-store-map';

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
    form: FormInstance;
    shipment: UseComputeOrderType['shipment'];
  }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const { t } = useTranslation('landing-page');
    const colors = useContext(ColorsContext);

    const { getFieldValue, setFieldsValue } = form;

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
          <Item
            className={styles.hideFormItem}
            key={fieldName}
            name={fieldName}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: index !== 0 ? ' ' : t('not-choose-store'),
              },
            ]}
          >
            <Input type="hidden" />
          </Item>
        ))}

        {CONVENIENCE_STORE_FIELDS.map(fieldName => (
          <Item
            key={fieldName}
            className={styles.hideFormItem}
            name={fieldName}
          >
            <Input type="hidden" />
          </Item>
        ))}

        {!isMapOpen ? null : (
          <ConvenienceStoreMap
            shipmentType={
              (() => {
                switch (shipment?.template) {
                  case 'allpay':
                    return ECPAY_SHIPMENT_TYPE_ENUM(
                      shipment.storeShipmentDetails?.accountInfo?.allpay
                        ?.logisticsSubType || '',
                    );
                  case 'ezship':
                    return 'EZSHIP';
                  case 'presco':
                    return 'ECPAY_B2C';
                  default:
                    return 'ECPAY';
                }
              })() as ConvenienceStoreShipmentTypeEnum
            }
            storeTypes={
              (() => {
                switch (shipment?.template) {
                  case 'allpay':
                    return ECPAY_CONVENIENCE_STORE_TYPE_ENUM(
                      shipment.storeShipmentDetails?.accountInfo?.allpay
                        ?.logisticsSubType || '',
                    );
                  case 'ezship':
                    return EZSHIP_CONVENIENCE_STORE_TYPE_ENUM;
                  case 'presco':
                    return ['UNIMART'];
                  default:
                    return ['UNIMART'];
                }
              })() as ConvenienceStoreTypeEnum[]
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
