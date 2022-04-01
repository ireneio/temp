// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo, useContext } from 'react';
import { TagOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import Thumbnail from '@meepshop/thumbnail';
import Link from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';

import styles from '../styles/useProductColumns.less';

// graphql typescript
import { useProductColumnsFragment as useProductColumnsFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export default (): ColumnProps<useProductColumnsFragmentType>[] => {
  const { t } = useTranslation('checkout');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);

  return useMemo(
    () => [
      {
        dataIndex: ['coverImage'],
        render: (value, { productId }) => (
          <Link href={`/product/${productId}`} target="_blank">
            <Thumbnail
              size={72}
              mobileSize={56}
              className={styles.thumbnail}
              image={filter(thumbnailFragment, value)}
            />
          </Link>
        ),
      },
      {
        dataIndex: ['title'],
        width: '100%',
        render: (value, { type, specs, activityInfo }) => (
          <div className={styles.title}>
            {type !== 'upselling_product' ? null : (
              <p className={styles.upselling}>{t('upselling-product')}</p>
            )}

            <div className={styles.name}>{getLanguage(value)}</div>

            {!specs ? null : (
              <div className={styles.specs}>
                {specs.map(spec => getLanguage(spec?.title)).join(' / ')}
              </div>
            )}

            {(activityInfo || []).length === 0 ? null : (
              <div className={styles.activityInfo}>
                {activityInfo?.map(activity => (
                  <Tag key={activity?.id}>
                    <TagOutlined />
                    <div>{getLanguage(activity?.title)}</div>
                  </Tag>
                ))}
              </div>
            )}
          </div>
        ),
      },
      {
        dataIndex: ['retailPrice'],
        render: (value, { type, quantity }) => (
          <div className={styles.retailPrice}>
            {type !== 'product' ? null : (
              <>
                <span>{`${quantity}X`}</span>
                {c(value || 0)}
              </>
            )}

            {type !== 'gift' ? null : t('gift')}
          </div>
        ),
      },
    ],
    [t, getLanguage, c],
  );
};
