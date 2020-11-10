// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { filter } from 'graphql-anywhere';
import moment from 'moment';

import Thumbnail, { thumbnailFragment } from '@meepshop/thumbnail';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from '../styles/useColumns.less';

// graphql typescript
import {
  useColumnsFragment,
  useColumnsFragment_title as useColumnsFragmenTitle,
} from '../gqls/__generated__/useColumnsFragment';

export default (
  dispatchAction: (dispatchName: string, data: unknown) => void,
): ColumnProps<useColumnsFragment>[] => {
  const { t } = useTranslation('member-wish-list');

  return useMemo(
    () => [
      {
        dataIndex: 'coverImage',
        render: (
          value: useColumnsFragment['coverImage'],
          { productId, isAvailableForSale }: useColumnsFragment,
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
          { productId, isAvailableForSale }: useColumnsFragment,
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
          value: useColumnsFragment['createdAt'],
          { isAvailableForSale }: useColumnsFragment,
        ) => (
          <span style={{ opacity: isAvailableForSale ? 1 : 0.5 }}>
            {isAvailableForSale ? moment.unix(value).format('YYYY/MM/DD') : '-'}
          </span>
        ),
      },
      {
        dataIndex: 'productId',
        title: t('cancel'),
        className: styles.icon,
        render: (value: useColumnsFragment['productId']) => (
          <Icon
            type="close"
            onClick={() => dispatchAction('updateWishList', { remove: value })}
          />
        ),
      },
    ],
    [t, dispatchAction],
  );
};
