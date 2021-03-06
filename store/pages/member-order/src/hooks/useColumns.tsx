// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo, useContext } from 'react';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Thumbnail from '@meepshop/thumbnail';
import filter from '@meepshop/utils/lib/filter';

import styles from '../styles/useColumns.less';

// graphql typescript
import { useColumnsMemberOrderFragment as useColumnsMemberOrderFragmentType } from '@meepshop/types/gqls/store';
import { thumbnailFragment as thumbnailFragmentType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export default (): ColumnProps<useColumnsMemberOrderFragmentType>[] => {
  const { t } = useTranslation('member-order');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);

  return useMemo(
    () => [
      {
        dataIndex: 'coverImage',
        render: (value: useColumnsMemberOrderFragmentType['coverImage']) => (
          <Thumbnail
            size={80}
            mobileSize={64}
            image={filter<thumbnailFragmentType>(thumbnailFragment, value)}
          />
        ),
      },
      {
        title: t('product.title'),
        dataIndex: 'title',
        width: '50%',
        render: (
          value: useColumnsMemberOrderFragmentType['title'],
          { specs, type, stock, quantity }: useColumnsMemberOrderFragmentType,
        ) => (
          <>
            {type !== 'upselling_product' ? null : (
              <div className={styles.tag}>
                <span
                  style={{
                    color: colors[0],
                    backgroundColor: colors[3],
                  }}
                >
                  {t('product.upselling-product')}
                </span>
              </div>
            )}

            {getLanguage(value)}

            <div>
              {(specs || [])
                .map(spec => getLanguage(spec?.title))
                .filter(Boolean)
                .join(' / ')}
            </div>

            <div>
              {`${t('product.quantity')}???${
                type === 'gift' && !stock ? 0 : quantity
              }`}
            </div>
          </>
        ),
      },
      {
        title: t('product.spec'),
        dataIndex: 'specs',
        width: '50%',
        render: (value: useColumnsMemberOrderFragmentType['specs']) =>
          (value || [])
            .map(spec => getLanguage(spec?.title))
            .filter(Boolean)
            .join(' / '),
      },
      {
        title: t('product.quantity'),
        dataIndex: 'quantity',
        align: 'center',
        render: (
          value: useColumnsMemberOrderFragmentType['quantity'],
          { type, stock }: useColumnsMemberOrderFragmentType,
        ) => (type === 'gift' && !stock ? 0 : value),
      },
      {
        title: t('product.price'),
        dataIndex: 'retailPrice',
        align: 'right',
        render: (
          value: useColumnsMemberOrderFragmentType['retailPrice'],
          { type }: useColumnsMemberOrderFragmentType,
        ) => (type === 'gift' ? t('product.gift') : c(value || 0)),
      },
      {
        title: t('product.subtotal'),
        dataIndex: 'retailPrice',
        align: 'right',
        key: 'subTotal',
        render: (
          value: useColumnsMemberOrderFragmentType['retailPrice'],
          { type, stock, quantity }: useColumnsMemberOrderFragmentType,
        ) =>
          type === 'gift'
            ? t(stock ? 'product.gift' : 'product.no-gift')
            : c((value || 0) * (quantity || 1)),
      },
    ],
    [t, colors, getLanguage, c],
  );
};
