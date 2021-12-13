// typescript import
import { ColumnProps } from 'antd/lib/table';

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
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import Switch from '@meepshop/switch';
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
  const { t } = useTranslation('cart-previewer');
  const getLanguage = useGetLanguage();
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
              ['DISCONTINUED', 'NOT_AVAILABLE'].includes(error || '');

            return (
              <Switch
                isTrue={!disabled}
                render={children => (
                  <Link href={`/product/${productId}`} target="_blank">
                    <a href={`/product/${productId}`}>{children}</a>
                  </Link>
                )}
              >
                <Thumbnail
                  image={image}
                  className={`${styles.img} ${
                    error !== 'NOT_AVAILABLE' ? '' : styles.offline
                  }`}
                />
              </Switch>
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
              ['DISCONTINUED', 'NOT_AVAILABLE'].includes(error || '');

            return (
              <>
                <Switch
                  isTrue={!disabled}
                  render={children => (
                    <Link href={`/product/${productId}`} target="_blank">
                      <a href={`/product/${productId}`}>{children}</a>
                    </Link>
                  )}
                >
                  <span
                    className={`${styles.title} ${
                      error !== 'NOT_AVAILABLE' ? '' : styles.offline
                    }`}
                  >
                    {error === 'DISCONTINUED'
                      ? t('product-deleted')
                      : getLanguage(title)}
                  </span>
                </Switch>

                {!specs ? null : (
                  <div
                    className={`${styles.specs} ${
                      error !== 'NOT_AVAILABLE' ? '' : styles.offline
                    }`}
                  >
                    {specs.map(spec => getLanguage(spec?.title)).join('/')}
                  </div>
                )}

                {!activityInfo?.length ? null : (
                  <div className={styles.tags}>
                    {activityInfo.map(activity => (
                      <span key={activity?.id}>
                        <TagOutlined />

                        <span>{getLanguage(activity?.title)}</span>
                      </span>
                    ))}
                  </div>
                )}

                {type !== 'product' ? (
                  <div className={styles.price}>{t('gift')}</div>
                ) : (
                  <>
                    {error &&
                    ['DISCONTINUED', 'NOT_AVAILABLE'].includes(error) ? null : (
                      <div className={styles.price}>
                        <span>{`${quantity}×`}</span>
                        <span>{c(retailPrice)}</span>
                      </div>
                    )}

                    {error &&
                    ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(
                      error,
                    ) ? (
                      <div className={styles.error}>
                        <ExclamationCircleOutlined />
                        {t(error)}
                      </div>
                    ) : null}
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
    [c, colors, getLanguage, removeProduct, t],
  );
};
