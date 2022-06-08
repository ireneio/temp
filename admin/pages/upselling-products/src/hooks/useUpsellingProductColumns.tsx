// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Thumbnail from '@admin/thumbnail';

import styles from '../styles/useUpsellingProductColumns.less';

// graphql typescript
import { useUpsellingProductColumnsFragment as useUpsellingProductColumnsFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (): ColumnProps<useUpsellingProductColumnsFragmentType>[] => {
  const { t } = useTranslation('upselling-products');
  const getLanguage = useGetLanguage();

  return useMemo(
    () => [
      {
        dataIndex: ['index'],
        title: t('index'),
        width: 48,
        align: 'center',
        className: styles.index,
        render: (_, __, index) => index + 1,
      },
      {
        dataIndex: ['coverImage'],
        width: 64,
        className: styles.thumbnail,
        render: (
          coverImage: useUpsellingProductColumnsFragmentType['coverImage'],
        ) => {
          return <Thumbnail image={coverImage} size={48} />;
        },
      },
      {
        dataIndex: ['title'],
        title: t('product-title'),
        width: '100%',
        className: styles.title,
        render: (title, row) => (
          <div>
            <div>
              {!row.variants?.[0]?.sku ? null : (
                <div className={styles.sku}>{row.variants[0].sku}</div>
              )}
              <div>{getLanguage(title)}</div>
            </div>
            {row.status ? null : (
              <span className={styles.status}>{t('off')}</span>
            )}
          </div>
        ),
      },
      {
        dataIndex: ['variants', '0', 'stock'],
        title: t('stock'),
        width: 120,
        align: 'center',
        className: styles.number,
        render: value => (!value ? t('no-stock') : value),
      },
      {
        dataIndex: ['variants', '0', 'retailPrice'],
        title: t('price'),
        width: 120,
        align: 'center',
        className: styles.number,
        render: value => `$${value}`,
      },
    ],
    [getLanguage, t],
  );
};
