// typescript import
import { ColumnProps } from 'antd/lib/table';

import { languageType } from '@meepshop/locales';

// import
import React, { useMemo, useContext } from 'react';
import {
  TagOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import Thumbnail from '@meepshop/thumbnail';

import useRemoveProduct from './useRemoveProduct';
import styles from '../styles/useProductsColumns.less';

// graphql typescript
import { useProductsColumnsInPreviewerFragment as useProductsColumnsInPreviewerFragmentType } from '@meepshop/types/gqls/store';

// import graphql
interface ReturnType {
  columns: ColumnProps<useProductsColumnsInPreviewerFragmentType>[];
  styles: string;
}

// definition
export default (): ReturnType => {
  const { t, i18n } = useTranslation('cart');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const removeProduct = useRemoveProduct();

  return useMemo(
    () => ({
      columns: [
        {
          dataIndex: ['coverImage'],
          width: 84,
          render: (
            image: useProductsColumnsInPreviewerFragmentType['coverImage'],
            { productId, type, error },
          ) => {
            const disabled =
              type !== 'product' ||
              ['PRODUCT_NOT_ONLINE', 'PRODUCT_DELETED'].includes(error || '');

            return (
              <Link
                href={`/product/${productId}`}
                disabled={disabled}
                target="_blank"
              >
                <Thumbnail
                  image={image}
                  className={`${styles.img} ${disabled ? '' : styles.link} ${
                    error !== 'PRODUCT_NOT_ONLINE' ? '' : styles.offline
                  }`}
                />
              </Link>
            );
          },
        },
        {
          dataIndex: ['title'],
          width: '100%',
          render: (
            title: useProductsColumnsInPreviewerFragmentType['title'],
            { productId, specs, activityInfo, type, error, ...product },
          ) => {
            const retailPrice = product.retailPrice || 0;
            const quantity = product.quantity || 0;
            const disabled =
              type !== 'product' ||
              ['PRODUCT_NOT_ONLINE', 'PRODUCT_DELETED'].includes(error || '');

            return (
              <>
                <Link
                  href={`/product/${productId}`}
                  disabled={disabled}
                  target="_blank"
                >
                  <div
                    className={`${styles.title} ${
                      error !== 'PRODUCT_NOT_ONLINE' ? '' : styles.offline
                    }`}
                  >
                    {error === 'PRODUCT_DELETED'
                      ? t('product-deleted')
                      : title?.[i18n.language as languageType] || title?.zh_TW}
                  </div>
                </Link>

                {!specs ? null : (
                  <div
                    className={`${styles.specs} ${
                      error !== 'PRODUCT_NOT_ONLINE' ? '' : styles.offline
                    }`}
                  >
                    {specs
                      .map(
                        spec =>
                          spec?.title?.[i18n.language as languageType] ||
                          spec?.title?.zh_TW,
                      )
                      .join('/')}
                  </div>
                )}

                {!activityInfo?.length ? null : (
                  <div className={styles.tags}>
                    {activityInfo.map(activity => (
                      <span key={activity?.id}>
                        <TagOutlined />

                        <span>
                          {activity?.title?.[i18n.language as languageType] ||
                            activity?.title?.zh_TW}
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {type !== 'product' ? (
                  <div className={styles.price}>{t('gift')}</div>
                ) : (
                  <>
                    {['PRODUCT_NOT_ONLINE', 'PRODUCT_DELETED'].includes(
                      error || '',
                    ) ? null : (
                      <div className={styles.price}>
                        <span>{`${quantity}×`}</span>
                        <span>{c(retailPrice)}</span>
                      </div>
                    )}

                    {!error ? null : (
                      <div className={styles.error}>
                        <ExclamationCircleOutlined />
                        {t(error)}
                      </div>
                    )}
                  </>
                )}
              </>
            );
          },
        },
        {
          dataIndex: ['cartId'],
          width: 20,
          render: (cartId, { type }) =>
            type !== 'product' ? null : (
              <CloseOutlined
                className={styles.delete}
                onClick={() => removeProduct(cartId)}
              />
            ),
        },
      ],
      styles: `
        .${styles.img} {
          border: 1px solid ${transformColor(colors[3]).alpha(0.1)};
          box-shadow: 0 1px 3px 0 ${transformColor(colors[3]).alpha(0.08)};
        }
        .${styles.specs} {
          color: ${transformColor(colors[3]).alpha(0.8)};
        }
        .${styles.tags} > span {
          background-color: ${transformColor(colors[3]).alpha(0.1)};
        }
      `,
    }),
    [c, colors, i18n.language, removeProduct, t],
  );
};
