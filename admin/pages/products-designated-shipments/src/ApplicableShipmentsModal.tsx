// import
import React, { useState } from 'react';
import { Form, Modal, Button, Checkbox } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { filter } from 'graphql-anywhere';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { productsDesignatedShipmentsDeliveryTruck } from '@meepshop/images';

import useSetProductDesignatedShipment from './hooks/useSetProductDesignatedShipment';
import styles from './styles/applicableShipmentsModal.less';

// graphql typescript
import {
  applicableShipmentsModalProductFragment as applicableShipmentsModalProductFragmentType,
  applicableShipmentsModalStoreShipmentFragment as applicableShipmentsModalStoreShipmentFragmentType,
  applicableShipmentsModalAdminProductsConnectionFragment as applicableShipmentsModalAdminProductsConnectionFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useSetProductDesignatedShipmentStoreShipmentFragment } from './gqls/useSetProductDesignatedShipment';

// typescript definition
interface PropsType {
  selectedProducts: applicableShipmentsModalProductFragmentType[];
  shipments: applicableShipmentsModalStoreShipmentFragmentType[];
  close: () => void;
  products: applicableShipmentsModalAdminProductsConnectionFragmentType | null;
  storeId: string | null;
}

// definition
const { Item: FormItem } = Form;
const { Group: CheckboxGroup } = Checkbox;

export default React.memo(
  ({ selectedProducts, shipments, close, products, storeId }: PropsType) => {
    const { t } = useTranslation('products-designated-shipments');
    const getLanguage = useGetLanguage();
    const setProductDesignatedShipment = useSetProductDesignatedShipment(
      selectedProducts,
      products,
      storeId,
      filter(useSetProductDesignatedShipmentStoreShipmentFragment, shipments),
      close,
    );
    const [form] = Form.useForm();
    const [type, setType] = useState<'DESIGNATED' | 'ALL'>(
      selectedProducts.length === 1 &&
        !selectedProducts[0].requireDesignatedShipment
        ? 'ALL'
        : 'DESIGNATED',
    );

    return (
      <Form form={form} onFinish={setProductDesignatedShipment}>
        <Modal
          maskClosable={false}
          className={styles.root}
          width={552}
          title={t('set-applicable-shipments')}
          footer={
            <>
              {selectedProducts.length > 1 ? (
                <div>
                  {t('apply-changes-to-selected-item')}
                  <b>{selectedProducts.length}</b>
                  {t('item')}
                </div>
              ) : (
                <div>
                  {t('apply-changes-to')}
                  <b>{getLanguage(selectedProducts[0].title)}</b>
                </div>
              )}

              <div>
                <Button onClick={close}>{t('cancel')}</Button>

                <FormItem shouldUpdate noStyle>
                  {({ getFieldValue, submit }) => (
                    <Button
                      type="primary"
                      onClick={submit}
                      disabled={
                        type === 'DESIGNATED' &&
                        (getFieldValue(['applicableShipmentIds']) || [])
                          .length === 0
                      }
                    >
                      {t('ok')}
                    </Button>
                  )}
                </FormItem>
              </div>
            </>
          }
          onCancel={close}
          closable={false}
          visible
        >
          <div className={styles.type}>
            {['DESIGNATED' as const, 'ALL' as const].map(key => (
              <div
                key={key}
                className={key === type ? styles.selected : ''}
                onClick={() => setType(key)}
              >
                {key === type ? (
                  <CheckCircleFilled />
                ) : (
                  <div className={styles.circle} />
                )}
                <div>
                  <h1>{t(`${key}.title`)}</h1>
                  <div>{t(`${key}.description`)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.items}>
            {type === 'DESIGNATED' ? (
              <div className={styles.shipments}>
                <FormItem shouldUpdate noStyle>
                  {({ getFieldValue, setFieldsValue }) => {
                    const selectAll =
                      getFieldValue(['applicableShipmentIds'])?.length ===
                      shipments?.length;

                    return (
                      <div
                        className={styles.all}
                        onClick={() =>
                          setFieldsValue({
                            applicableShipmentIds: selectAll
                              ? []
                              : shipments?.map(shipment => shipment.id),
                          })
                        }
                      >
                        {selectAll ? t('cancel-select-all') : t('select-all')}
                      </div>
                    );
                  }}
                </FormItem>

                <FormItem
                  name={['applicableShipmentIds']}
                  noStyle
                  initialValue={
                    selectedProducts.length === 1
                      ? selectedProducts[0].applicableShipments.map(
                          select => select.id,
                        )
                      : null
                  }
                >
                  <CheckboxGroup>
                    {shipments?.map(shipment => (
                      <Checkbox key={shipment.id} value={shipment.id}>
                        {getLanguage(shipment.title)}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </FormItem>
              </div>
            ) : (
              <img
                src={productsDesignatedShipmentsDeliveryTruck}
                alt="deliveryTruck"
              />
            )}
          </div>
        </Modal>
      </Form>
    );
  },
);
