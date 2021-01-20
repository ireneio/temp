// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { filter } from 'graphql-anywhere';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Thumbnail from '@meepshop/thumbnail';

import useRemove from './useRemove';
import styles from '../styles/useColumns.less';

// graphql typescript
import {
  useColumnsWishlistProductFragment,
  useColumnsWishlistProductFragment_title as useColumnsFragmenTitle,
  useColumnsUserFragment,
} from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

import { useRemoveFragment } from '../gqls/useRemove';

// definition
export default (
  user: useColumnsUserFragment | null,
): ColumnProps<useColumnsWishlistProductFragment>[] => {
  const { t } = useTranslation('member-wish-list');
  const remove = useRemove(filter(useRemoveFragment, user));

  return useMemo(
    () => [
      {
        dataIndex: 'coverImage',
        render: (
          value: useColumnsWishlistProductFragment['coverImage'],
          { productId, isAvailableForSale }: useColumnsWishlistProductFragment,
        ) =>
          !isAvailableForSale ? (
            <Thumbnail image={filter(thumbnailFragment, value || null)} />
          ) : (
            <a
              href={`/product/${productId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Thumbnail image={filter(thumbnailFragment, value || null)} />
            </a>
          ),
      },
      {
        dataIndex: 'title.zh_TW',
        title: t('productTitle'),
        render: (
          value: useColumnsFragmenTitle['zh_TW'],
          { productId, isAvailableForSale }: useColumnsWishlistProductFragment,
        ) =>
          !isAvailableForSale ? (
            <span className={styles.notAvailableForSale}>
              {t('notAvailableForSale')}
            </span>
          ) : (
            <a
              className={styles.link}
              href={`/product/${productId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          ),
      },
      {
        dataIndex: 'createdAt',
        title: t('addDate'),
        className: styles.addDate,
        render: (
          value: useColumnsWishlistProductFragment['createdAt'],
          { isAvailableForSale }: useColumnsWishlistProductFragment,
        ) => (
          <span style={{ opacity: isAvailableForSale ? 1 : 0.5 }}>
            {isAvailableForSale ? moment(value).format('YYYY/MM/DD') : '-'}
          </span>
        ),
      },
      {
        dataIndex: 'productId',
        title: t('cancel'),
        className: styles.icon,
        render: (value: useColumnsWishlistProductFragment['productId']) => (
          <Icon type="close" onClick={() => remove({ productId: value })} />
        ),
      },
    ],
    [t, remove],
  );
};
