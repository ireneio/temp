// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { EditOutlined } from '@ant-design/icons';

import Tooltip from '@admin/tooltip';
import Thumbnail from '@admin/thumbnail';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from '../styles/useColumns.less';

// graphql typescript
import {
  useColumnsProductFragment as useColumnsProductFragmentType,
  getAdminProducts_viewer_store_adminProducts_edges_node as getAdminProductsViewerStoreAdminProductsEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  setOpenModal: (visible: boolean) => void,
  setSelectedProducts: (
    products: getAdminProductsViewerStoreAdminProductsEdgesNodeType[],
  ) => void,
): ColumnProps<useColumnsProductFragmentType>[] => {
  const { t } = useTranslation('products-designated-shipments');
  const getLanguage = useGetLanguage();

  return useMemo(
    () => [
      {
        width: 36,
        dataIndex: ['coverImage'],
        className: styles.coverImage,
        render: (value: useColumnsProductFragmentType['coverImage']) => (
          <Thumbnail size={40} image={value} />
        ),
      },
      {
        width: 344,
        dataIndex: ['title'],
        title: t('product.title'),
        render: (value: useColumnsProductFragmentType['title']) =>
          getLanguage(value),
      },
      {
        width: 150,
        dataIndex: ['variants', 0, 'sku'],
        className: styles.sku,
        title: t('product.sku'),
      },
      {
        dataIndex: ['applicableShipments'],
        title: (
          <>
            {t('product.applicable-shipments')}
            <Tooltip
              title={t('product.applicable-shipments-tip')}
              iconClassName={styles.icon}
            />
          </>
        ),
        render: (
          value: useColumnsProductFragmentType['applicableShipments'],
          product,
        ) => {
          if (!product.requireDesignatedShipment) {
            return (
              <div
                className={styles.shipmentWrap}
                onClick={() => {
                  setSelectedProducts([product]);
                  setOpenModal(true);
                }}
              >
                {t('all-shipments')}
                <EditOutlined className={styles.edit} />
              </div>
            );
          }

          return (
            <div
              className={styles.shipmentWrap}
              onClick={() => {
                setSelectedProducts([product]);
                setOpenModal(true);
              }}
            >
              {value.length !== 0 ? (
                value.map(({ title, status }) => (
                  <span
                    className={`${styles.shipment} ${
                      status === 0 ? styles.offline : ''
                    }`}
                  >
                    {getLanguage(title)}
                  </span>
                ))
              ) : (
                <span className={styles.offline}>
                  {t('applicable-shipments-removed')}
                </span>
              )}
              <EditOutlined className={styles.edit} />
            </div>
          );
        },
      },
    ],
    [t, getLanguage, setSelectedProducts, setOpenModal],
  );
};
