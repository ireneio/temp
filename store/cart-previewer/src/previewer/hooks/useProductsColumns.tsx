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
            { productId, type, status },
          ) => {
            const disabled =
              type !== 'PRODUCT' ||
              ['DISCONTINUED', 'NOT_AVAILABLE'].includes(status || '');

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
                    status !== 'NOT_AVAILABLE' ? '' : styles.offline
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
            { productId, specs, discountAllocations, type, status, ...product },
          ) => {
            const retailPrice = product.unitPrice || 0;
            const quantity = product.quantity || 0;
            const disabled =
              type !== 'PRODUCT' ||
              ['DISCONTINUED', 'NOT_AVAILABLE'].includes(status || '');

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
                      status !== 'NOT_AVAILABLE' ? '' : styles.offline
                    }`}
                  >
                    {status === 'DISCONTINUED'
                      ? t('product-deleted')
                      : getLanguage(title)}
                  </span>
                </Switch>

                {!specs ? null : (
                  <div
                    className={`${styles.specs} ${
                      status !== 'NOT_AVAILABLE' ? '' : styles.offline
                    }`}
                  >
                    {specs.map(spec => getLanguage(spec?.title)).join('/')}
                  </div>
                )}

                {!discountAllocations?.length ? null : (
                  <div className={styles.tags}>
                    {discountAllocations.map(activity => (
                      <span key={activity?.activityId}>
                        <TagOutlined />

                        <span>{getLanguage(activity?.title)}</span>
                      </span>
                    ))}
                  </div>
                )}

                {type !== 'PRODUCT' ? (
                  <div className={styles.price}>{t('gift')}</div>
                ) : (
                  <>
                    {status &&
                    ['DISCONTINUED', 'NOT_AVAILABLE'].includes(
                      status,
                    ) ? null : (
                      <div className={styles.price}>
                        <span>{`${quantity}×`}</span>
                        <span>{c(retailPrice)}</span>
                      </div>
                    )}

                    {status &&
                    ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(
                      status,
                    ) ? (
                      <div className={styles.error}>
                        <ExclamationCircleOutlined />
                        {t(status)}
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
            type !== 'PRODUCT' ? null : (
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
