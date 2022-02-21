// import
import React, { useContext, useState, useEffect } from 'react';
import { filter } from 'graphql-anywhere';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import ConvenienceStoreMap from '@meepshop/form-convenience-store-map';

import useConvenienceStore from './hooks/useConvenienceStore';
import { SHIPMENT_STORE_FIELDS, CONVENIENCE_STORE_FIELDS } from './constants';
import styles from './styles/chooseShipmentStore.less';

// graphql typescript
import { useConvenienceStoreFragment as useConvenienceStoreFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useConvenienceStoreFragment } from './gqls/useConvenienceStore';

// typescript definition
interface PropsType {
  shipment: useConvenienceStoreFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ shipment }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const [scrollY, setScrollY] = useState<number>(0);
  const [openConvenienceStoreMap, setOpenConvenienceStoreMap] = useState<
    boolean
  >(false);
  const { shipmentType, storeTypes } = useConvenienceStore(
    filter(useConvenienceStoreFragment, shipment || null),
  );

  useEffect(() => {
    if (!openConvenienceStoreMap) {
      // Fix ios body overflow: hidden bug
      if (window.getComputedStyle(document.body).position === 'fixed') {
        window.scrollTo(0, scrollY);
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = '';
      }
    }
  }, [openConvenienceStoreMap, scrollY]);

  return (
    <>
      <FormItem shouldUpdate noStyle>
        {({ getFieldsValue, getFieldValue, setFieldsValue }) => {
          const isStoreSelected = Object.values(
            getFieldsValue(SHIPMENT_STORE_FIELDS),
          ).some(Boolean);

          return (
            <div
              className={`${styles.root} ${
                isStoreSelected ? styles.selected : ''
              }`}
            >
              {!isStoreSelected ? null : (
                <div className={styles.info}>
                  {SHIPMENT_STORE_FIELDS.map((field, index) =>
                    !getFieldValue(field) ? null : (
                      <div key={getFieldValue(field)}>
                        {index > 0
                          ? `${t(`convenience-store.${field}`)}：`
                          : ''}
                        {getFieldValue(field)}
                      </div>
                    ),
                  )}
                </div>
              )}

              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setOpenConvenienceStoreMap(true);
                  setScrollY(window.scrollY);
                }}
              >
                {isStoreSelected ? t('rechoose-store') : t('choose-store')}
              </Button>

              {CONVENIENCE_STORE_FIELDS.map(fieldName => (
                <FormItem key={fieldName} name={[fieldName]} noStyle>
                  <Input type="hidden" />
                </FormItem>
              ))}

              {!openConvenienceStoreMap ? null : (
                <ConvenienceStoreMap
                  shipmentType={shipmentType}
                  storeTypes={storeTypes}
                  close={() => setOpenConvenienceStoreMap(false)}
                  confirmStore={store => {
                    setFieldsValue(store);
                    setOpenConvenienceStoreMap(false);
                  }}
                />
              )}
            </div>
          );
        }}
      </FormItem>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-btn {
              color: ${colors[2]};
              border-color: ${colors[4]};
              background: ${colors[4]};
            }
          `,
        }}
      />
    </>
  );
});
