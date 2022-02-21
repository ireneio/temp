// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';

// import Tooltip from '@admin/tooltip';
import Thumbnail from '@admin/thumbnail';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from '../styles/useColumns.less';

// graphql typescript
import { useColumnsProductFragment as useColumnsProductFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<useColumnsProductFragmentType>[] => {
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
        dataIndex: ['variants', 0, 'sku'],
        className: styles.sku,
        title: t('product.sku'),
      },
      // FIXME: add applicableShipments column after T9544
      // {
      //   dataIndex: ['applicableShipments'],
      //   title: (
      //     <>
      //       {t('product.applicable-shipments')}
      //       <Tooltip
      //         title={t('product.applicable-shipments-tip')}
      //         iconClassName={styles.icon}
      //       />
      //     </>
      //   ),
      //   render: (value: useColumnsProductFragmentType['applicableShipments']) =>
      //     value || t('all-shipments'),
      // },
    ],
    [t, getLanguage],
  );
};
