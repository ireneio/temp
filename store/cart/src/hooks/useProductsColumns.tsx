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
  Sensor as SensorContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';
import ProductAmountSelector from '@meepshop/product-amount-selector';
import Thumbnail from '@meepshop/thumbnail';

import useUpdateProduct from './useUpdateProduct';
import useRemoveProduct from './useRemoveProduct';
import styles from '../styles/useProductsColumns.less';

// graphql typescript
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/store';

// import graphql
interface ReturnType {
  columns: ColumnProps<useProductsColumnsFragmentType>[];
  styles: string;
}

// definition
export default (hasError: boolean): ReturnType => {
  const { t, i18n } = useTranslation('cart');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const { isMobile } = useContext(SensorContext);
  const updateProduct = useUpdateProduct();
  const removeProduct = useRemoveProduct();

  return useMemo(
    () => ({
      columns: [
        {
          dataIndex: ['coverImage'],
          width: isMobile ? 112 : 124,
          render: (
            image: useProductsColumnsFragmentType['coverImage'],
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
          title: t('product'),
          dataIndex: ['title'],
          width: '55%',
          render: (
            title: useProductsColumnsFragmentType['title'],
            {
              cartId,
              productId,
              specs,
              activityInfo,
              type,
              error,
              variant,
              ...product
            },
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

                {/** mobile view */}
                <div className={styles.mobile}>
                  {type !== 'product' ? (
                    <div className={styles.price}>{t('gift')}</div>
                  ) : (
                    <>
                      {['PRODUCT_NOT_ONLINE', 'PRODUCT_DELETED'].includes(
                        error || '',
                      ) ? null : (
                        <div className={styles.price}>
                          {c(retailPrice * quantity)}
                        </div>
                      )}

                      {!error ? (
                        <ProductAmountSelector
                          className={styles.select}
                          variant={variant}
                          value={quantity}
                          onChange={updateProduct(cartId || '')}
                        />
                      ) : (
                        <div className={styles.error}>
                          <ExclamationCircleOutlined />
                          {hasError ? t(`${error}-warning`) : t(error)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            );
          },
        },
        {
          title: t('price'),
          dataIndex: ['retailPrice'],
          className: styles.price,
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (
            retailPrice: useProductsColumnsFragmentType['retailPrice'],
            { type, error },
          ) => {
            if (type !== 'product') return t('gift');

            if (error) return null;

            return c(retailPrice || 0);
          },
        },
        {
          title: t('quantity'),
          dataIndex: ['quantity'],
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (
            quantity: useProductsColumnsFragmentType['quantity'],
            { cartId, type, variant, error },
          ) => {
            if (type !== 'product') return null;

            if (error)
              return (
                <div className={styles.error}>
                  <ExclamationCircleOutlined />
                  {hasError ? t(`${error}-warning`) : t(error)}
                </div>
              );

            return (
              <ProductAmountSelector
                className={styles.select}
                variant={variant}
                value={quantity || 0}
                onChange={updateProduct(cartId || '')}
              />
            );
          },
        },
        {
          title: t('subtotal'),
          dataIndex: ['totalPrice'],
          className: styles.price,
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (
            _totalPrice: useProductsColumnsFragmentType['totalPrice'],
            { type, retailPrice, quantity, error },
          ) =>
            type !== 'product' || error
              ? null
              : c((retailPrice || 0) * (quantity || 0)),
        },
        {
          dataIndex: ['cartId'],
          width: isMobile ? 28 : 48,
          align: 'center',
          render: (cartId, { type, error }) =>
            type !== 'product' || error ? null : (
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
        .${styles.tags} > span {
          background-color: ${transformColor(colors[3]).alpha(0.1)};
        }
      `,
    }),
    [
      c,
      colors,
      hasError,
      i18n.language,
      isMobile,
      removeProduct,
      t,
      updateProduct,
    ],
  );
};
