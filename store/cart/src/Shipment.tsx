// import
import React, { useMemo } from 'react';
import { Form, Skeleton } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { AlertOutlineIcon } from '@meepshop/icons';
import Radio from '@store/radio';
import Alert from '@store/alert';

import styles from './styles/shipment.less';
import productsStyles from './styles/products.less';

// graphql typescript
import { useShipmentsFragment_applicableShipments as useShipmentsFragmentApplicableShipmentsType } from '@meepshop/types/gqls/store';

// typscript definition
interface PropsType {
  loading: boolean;
  shipments: useShipmentsFragmentApplicableShipmentsType[];
  requireDesignatedShipment: boolean;
  unvailableItemsLenth: number;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    loading,
    shipments,
    requireDesignatedShipment,
    unvailableItemsLenth,
  }: PropsType) => {
    const { t } = useTranslation('cart');
    const getLanguage = useGetLanguage();
    const options = useMemo(
      () =>
        shipments.map(({ id, title, description }) => ({
          value: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
          label: getLanguage(title),
          description: getLanguage(description),
        })),
      [getLanguage, shipments],
    );

    return (
      <div className={styles.root}>
        <div className={styles.title}>{t('shipment.title')}</div>

        {loading ? (
          <Skeleton
            className={styles.empty}
            title={false}
            paragraph={{ rows: 4, width: '100%' }}
            active
          />
        ) : (
          <>
            <FormItem shouldUpdate noStyle>
              {({ getFieldError }) =>
                !getFieldError(['shipmentId']).length ? null : (
                  <Alert
                    className={styles.error}
                    type="error"
                    message={getFieldError(['shipmentId'])}
                  />
                )
              }
            </FormItem>

            {!options.length ? (
              <Alert
                className={styles.empty}
                type="error"
                message={t('shipment.alert-tip-2')}
              />
            ) : (
              <FormItem
                className={styles.shipment}
                name={['shipmentId']}
                rules={[{ required: true, message: t('shipment.alert-tip-1') }]}
              >
                <Radio
                  options={options}
                  tip={
                    !requireDesignatedShipment ||
                    !unvailableItemsLenth ? null : (
                      <div className={styles.tip}>
                        <div>
                          <AlertOutlineIcon />
                          <span>{t('you-have')}</span>
                          <span className={styles.number}>
                            {unvailableItemsLenth}
                          </span>
                          <span>{t('unvailable-tip')}</span>
                        </div>
                        <span
                          onClick={() => {
                            const tipDom = document.querySelector(
                              `.${productsStyles.tip}`,
                            );
                            if (tipDom)
                              tipDom.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {t('check-unvailable')}
                        </span>
                      </div>
                    )
                  }
                />
              </FormItem>
            )}
          </>
        )}

        <FormItem dependencies={['shipmentId']} noStyle>
          {({ getFieldValue, setFieldsValue }) => {
            const shipment = shipments.find(
              item => item?.id === getFieldValue(['shipmentId']),
            );

            setFieldsValue(
              !shipment && !loading
                ? {
                    shipmentId: undefined,
                  }
                : { shipment },
            );
          }}
        </FormItem>
      </div>
    );
  },
);
