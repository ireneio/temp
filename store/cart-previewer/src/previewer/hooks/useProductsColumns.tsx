// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo, useContext } from 'react';
import { filter } from 'graphql-anywhere';
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
import { useCart } from '@meepshop/hooks';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import Switch from '@meepshop/switch';
import Thumbnail from '@meepshop/thumbnail';

import styles from '../styles/useProductsColumns.less';

// graphql typescript
import {
  useProductsColumnsInPreviewerUserFragment as useProductsColumnsInPreviewerUserFragmentType,
  useProductsColumnsInPreviewerLineItemFragment as useProductsColumnsInPreviewerLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface ReturnType {
  columns: ColumnProps<useProductsColumnsInPreviewerLineItemFragmentType>[];
  styles: string;
}

// definition
export default (
  viewer: useProductsColumnsInPreviewerUserFragmentType | null,
): ReturnType => {
  const { t } = useTranslation('cart-previewer');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const { upsertCart } = useCart(filter(useCartFragment, viewer));

  return useMemo(
    () => ({
      columns: [
        {
          dataIndex: ['coverImage'],
          width: 84,
          render: (
            image: useProductsColumnsInPreviewerLineItemFragmentType['coverImage'],
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
            title: useProductsColumnsInPreviewerLineItemFragmentType['title'],
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
          dataIndex: ['quantity'],
          width: 20,
          render: (
            quantity: useProductsColumnsInPreviewerLineItemFragmentType['quantity'],
            { type, productId, variantId },
          ) =>
            type !== 'PRODUCT' ? null : (
              <CloseOutlined
                className={styles.delete}
                onClick={() =>
                  upsertCart({
                    __typename: 'CartItem' as const,
                    productId,
                    quantity: (quantity || 0) * -1,
                    variantId,
                  })
                }
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
    [t, getLanguage, c, colors, upsertCart],
  );
};
