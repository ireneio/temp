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
  Sensor as SensorContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import ProductAmountSelector from '@meepshop/product-amount-selector';
import Switch from '@meepshop/switch';
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
  const { t } = useTranslation('cart');
  const getLanguage = useGetLanguage();
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
          width: isMobile ? 102 : 124,
          render: (
            image: useProductsColumnsFragmentType['coverImage'],
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
          title: t('product'),
          dataIndex: ['title'],
          width: isMobile ? '100%' : '55%',
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

                {/** mobile view */}
                <div className={styles.mobile}>
                  {type !== 'product' ? (
                    <div className={styles.price}>{t('gift')}</div>
                  ) : (
                    <>
                      {error &&
                      ['DISCONTINUED', 'NOT_AVAILABLE'].includes(
                        error,
                      ) ? null : (
                        <div className={styles.price}>
                          {c(retailPrice * quantity)}
                        </div>
                      )}

                      {error &&
                      [
                        'DISCONTINUED',
                        'NOT_AVAILABLE',
                        'OUT_OF_STOCK',
                      ].includes(error) ? (
                        <div className={styles.error}>
                          <ExclamationCircleOutlined />
                          {hasError ? t(`${error}-warning`) : t(error)}
                        </div>
                      ) : (
                        <>
                          <ProductAmountSelector
                            size="large"
                            className={`${styles.select} ${
                              !error ? '' : styles.withError
                            }`}
                            variant={variant}
                            value={quantity}
                            onChange={updateProduct(cartId || '')}
                          />

                          {!error ? null : (
                            <div className={styles.amountError}>{t(error)}</div>
                          )}
                        </>
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

            if (
              error &&
              ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(error)
            )
              return (
                <div className={styles.error}>
                  <ExclamationCircleOutlined />
                  {hasError ? t(`${error}-warning`) : t(error)}
                </div>
              );

            return (
              <>
                <ProductAmountSelector
                  size="large"
                  className={`${styles.select} ${
                    !error ? '' : styles.withError
                  }`}
                  variant={variant}
                  value={quantity || 0}
                  onChange={updateProduct(cartId || '')}
                />

                {!error ? null : (
                  <div className={styles.amountError}>{t(error)}</div>
                )}
              </>
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
          box-shadow: 0 1px 3px 0 ${transformColor(colors[3]).alpha(
            0.08,
          )} !important;
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
      getLanguage,
      isMobile,
      removeProduct,
      t,
      updateProduct,
    ],
  );
};
