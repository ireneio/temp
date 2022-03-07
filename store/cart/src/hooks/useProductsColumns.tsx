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
  Sensor as SensorContext,
} from '@meepshop/context';
import { useCart } from '@meepshop/hooks';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import ProductAmountSelector from '@meepshop/product-amount-selector';
import Switch from '@meepshop/switch';
import Thumbnail from '@meepshop/thumbnail';

import styles from '../styles/useProductsColumns.less';

// graphql typescript
import {
  useProductsColumnsUserFragment as useProductsColumnsUserFragmentType,
  useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface ReturnType {
  columns: ColumnProps<useProductsColumnsLineItemFragmentType>[];
  styles: string;
}

// definition
export default (
  viewer: useProductsColumnsUserFragmentType | null,
  hasError: boolean,
): ReturnType => {
  const { t } = useTranslation('cart');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const { isMobile } = useContext(SensorContext);
  const { upsertCart } = useCart(filter(useCartFragment, viewer));

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
              variantId,
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
                {type !== 'UPSELLING_PRODUCT' ? null : (
                  <div>
                    <span className={styles.upselling}>
                      {t('upselling-product')}
                    </span>
                  </div>
                )}

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
                  {type === 'GIFT' ? (
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
                            onChange={newQuantity =>
                              upsertCart({
                                __typename: 'CartItem' as const,
                                productId,
                                quantity: newQuantity - (quantity || 0),
                                variantId,
                              })
                            }
                          />

                          {['PURCHASABLE', 'EXCEED_LIMIT_PER_ORDER'].includes(
                            status,
                          ) ? null : (
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
            if (type === 'GIFT') return t('gift');

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
            { type, variant, status, productId, variantId },
          ) => {
            if (type === 'GIFT') return null;

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
                  onChange={newQuantity =>
                    upsertCart({
                      __typename: 'CartItem' as const,
                      productId,
                      quantity: newQuantity - (quantity || 0),
                      variantId,
                    })
                  }
                />

                {['PURCHASABLE', 'EXCEED_LIMIT_PER_ORDER'].includes(
                  status,
                ) ? null : (
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
            type === 'GIFT' || status !== 'PURCHASABLE'
              ? null
              : c((unitPrice || 0) * (quantity || 0)),
        },
        {
          dataIndex: ['quantity'],
          width: isMobile ? 28 : 48,
          align: 'center',
          render: (
            quantity: useProductsColumnsLineItemFragmentType['quantity'],
            { type, productId, variantId },
          ) =>
            type === 'GIFT' ? null : (
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
          box-shadow: 0 1px 3px 0 ${transformColor(colors[3]).alpha(
            0.08,
          )} !important;
        }
        .${styles.upselling} {
          color: ${colors[0]};
          background-color: ${colors[3]};
        }
        .${styles.tags} > span {
          background-color: ${transformColor(colors[3]).alpha(0.1)};
        }
      `,
    }),
    [hasError, t, getLanguage, c, colors, isMobile, upsertCart],
  );
};
