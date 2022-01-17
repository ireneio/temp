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
import {
  useProductsColumnsUserFragment as useProductsColumnsUserFragmentType,
  useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface ReturnType {
  columns: ColumnProps<useProductsColumnsLineItemFragmentType>[];
  styles: string;
}

// definition
export default (
  // FIXME: using useCart and useCartFragment in T9918
  _viewer: useProductsColumnsUserFragmentType | null,
  hasError: boolean,
): ReturnType => {
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
            image: useProductsColumnsLineItemFragmentType['coverImage'],
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
          title: t('product'),
          dataIndex: ['title'],
          width: isMobile ? '100%' : '55%',
          render: (
            title: useProductsColumnsLineItemFragmentType['title'],
            {
              productId,
              specs,
              type,
              status,
              variant,
              discountAllocations,
              cartId,
              ...product
            },
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

                {/** mobile view */}
                <div className={styles.mobile}>
                  {type !== 'PRODUCT' ? (
                    <div className={styles.price}>{t('gift')}</div>
                  ) : (
                    <>
                      {['DISCONTINUED', 'NOT_AVAILABLE'].includes(
                        status,
                      ) ? null : (
                        <div className={styles.price}>
                          {c(retailPrice * quantity)}
                        </div>
                      )}

                      {[
                        'DISCONTINUED',
                        'NOT_AVAILABLE',
                        'OUT_OF_STOCK',
                      ].includes(status) ? (
                        <div className={styles.error}>
                          <ExclamationCircleOutlined />
                          {hasError ? t(`${status}-warning`) : t(status)}
                        </div>
                      ) : (
                        <>
                          <ProductAmountSelector
                            size="large"
                            className={`${styles.select} ${
                              status === 'PURCHASABLE' ? '' : styles.withError
                            }`}
                            variant={variant}
                            value={quantity}
                            onChange={updateProduct(cartId)}
                          />

                          {status === 'PURCHASABLE' ? null : (
                            <div className={styles.amountError}>
                              {t(status)}
                            </div>
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
          dataIndex: ['unitPrice'],
          className: styles.price,
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (
            unitPrice: useProductsColumnsLineItemFragmentType['unitPrice'],
            { type, status },
          ) => {
            if (type !== 'PRODUCT') return t('gift');

            if (status !== 'PURCHASABLE') return null;

            return c(unitPrice || 0);
          },
        },
        {
          title: t('quantity'),
          dataIndex: ['quantity'],
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (
            quantity: useProductsColumnsLineItemFragmentType['quantity'],
            { type, variant, status, cartId },
          ) => {
            if (type !== 'PRODUCT') return null;

            if (
              ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(status)
            )
              return (
                <div className={styles.error}>
                  <ExclamationCircleOutlined />
                  {hasError ? t(`${status}-warning`) : t(status)}
                </div>
              );

            return (
              <>
                <ProductAmountSelector
                  size="large"
                  className={`${styles.select} ${
                    status === 'PURCHASABLE' ? '' : styles.withError
                  }`}
                  variant={variant}
                  value={quantity || 0}
                  onChange={updateProduct(cartId)}
                />

                {status === 'PURCHASABLE' ? null : (
                  <div className={styles.amountError}>{t(status)}</div>
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
            _totalPrice: number,
            { type, unitPrice, quantity, status },
          ) =>
            type !== 'PRODUCT' || status !== 'PURCHASABLE'
              ? null
              : c((unitPrice || 0) * (quantity || 0)),
        },
        {
          dataIndex: ['cartId'],
          width: isMobile ? 28 : 48,
          align: 'center',
          render: (
            cartId: useProductsColumnsLineItemFragmentType['cartId'],
            { type },
          ) => {
            return type !== 'PRODUCT' ? null : (
              <CloseOutlined
                className={styles.delete}
                onClick={() => removeProduct(cartId)}
              />
            );
          },
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
