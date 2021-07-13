import React, { useMemo, useContext, useCallback } from 'react';
import { TagOutlined } from '@ant-design/icons';
import { Tag, notification } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import CartContext from '@meepshop/cart';
import { CartDeleteIcon } from '@meepshop/icons';
import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';
import Link from '@meepshop/link';
import ProductAmountSelector from '@meepshop/product-amount-selector';

import styles from './styles/useColumns.less';

export default ({ productHasError, updateCart, onChange }) => {
  const { t, i18n } = useTranslation('order-product-list');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const { updateProductInCart, removeProductFromCart } = useContext(
    CartContext,
  );

  const changeProduct = useCallback(
    cartId => async value => {
      updateCart(true);

      await updateProductInCart({
        variables: {
          search: {
            productsInfo: {
              updateData: {
                id: cartId,
                quantity: value,
              },
            },
          },
        },
      });

      if (onChange) onChange({ cartId, quantity: value });

      updateCart(false);
      notification.success({
        message: t('update-product-in-cart'),
      });
    },
    [updateCart, onChange, t, updateProductInCart],
  );

  return useMemo(
    () => [
      {
        dataIndex: ['coverImage', 'scaledSrc', 'w120'],
        width: 80,
        render: (src, { productId, type, error }) => (
          <Link
            href={`/product/${productId}`}
            disabled={type !== 'product' || error === 'PRODUCT_NOT_ONLINE'}
            target="_blank"
          >
            <div
              className={`${styles.img} ${
                type !== 'product' || error === 'PRODUCT_NOT_ONLINE'
                  ? ''
                  : styles.link
              } ${
                error !== 'PRODUCT_NOT_ONLINE' ? '' : styles.productNotOnline
              }`}
              style={{
                backgroundImage: `url(${src || placeholderThumbnail})`,
              }}
            />
          </Link>
        ),
      },
      {
        dataIndex: ['title'],
        width: '100%',
        render: (
          title,
          {
            specs,
            activityInfo,
            error,
            retailPrice,
            quantity,
            type,
            cartId,
            variant,
          },
        ) => {
          const {
            currentMinPurchasableQty,
            currentMaxPurchasableQty,
          } = variant;
          const hasError =
            quantity < currentMinPurchasableQty ||
            quantity > currentMaxPurchasableQty;

          return (
            <div
              className={styles.title}
              style={{
                color: transformColor(colors[3]).alpha(
                  error !== 'PRODUCT_NOT_ONLINE' ? 1 : 0.25,
                ),
              }}
            >
              {title[i18n.language] || title.zh_TW}

              {!specs ? null : (
                <div
                  style={{
                    color: transformColor(colors[3]).alpha(
                      error !== 'PRODUCT_NOT_ONLINE' ? 0.65 : 0.25,
                    ),
                  }}
                >
                  {specs
                    .map(
                      ({ title: specTitle }) =>
                        specTitle[i18n.language] || specTitle.zh_TW,
                    )
                    .join('/')}
                </div>
              )}

              {(activityInfo || []).length === 0 ? null : (
                <div className={styles.tags}>
                  {activityInfo.map(({ id, title: activityTitle }) => (
                    <Tag
                      key={id}
                      style={{
                        color: transformColor(colors[3]).alpha(0.85),
                        opacity: error !== 'PRODUCT_NOT_ONLINE' ? 1 : 0.45,
                      }}
                      color={transformColor(colors[5]).alpha(0.3)}
                    >
                      <TagOutlined />

                      <span>
                        {activityTitle[i18n.language] || activityTitle.zh_TW}
                      </span>
                    </Tag>
                  ))}
                </div>
              )}

              {type !== 'product' ? null : (
                <div
                  className={error ? '' : styles.price}
                  style={
                    !error
                      ? {}
                      : {
                          color: productHasError
                            ? '#d0011b'
                            : transformColor(colors[3]).alpha(0.25),
                        }
                  }
                >
                  {!error
                    ? c(retailPrice * quantity)
                    : {
                        PRODUCT_NOT_ONLINE: t(
                          `product-not-online${
                            !productHasError ? '' : '-warning'
                          }`,
                        ),
                        PRODUCT_SOLD_OUT: t(
                          `product-sold-out${
                            !productHasError ? '' : '-warning'
                          }`,
                        ),
                      }[error]}
                </div>
              )}

              {error || type !== 'product' ? null : (
                <ProductAmountSelector
                  className={`${styles.select} ${styles.mobile}`}
                  variant={variant}
                  value={quantity}
                  onChange={changeProduct(cartId)}
                />
              )}

              {error || type !== 'product' || !hasError ? null : (
                <div className={`${styles.hasError} ${styles.mobile}`}>
                  {t('quantity-out-of-range')}
                </div>
              )}
            </div>
          );
        },
      },
      {
        dataIndex: ['quantity'],
        render: (quantity, { error, type, cartId, variant }) => {
          if (error || type !== 'product') return null;

          const {
            currentMinPurchasableQty,
            currentMaxPurchasableQty,
          } = variant;
          const hasError =
            quantity < currentMinPurchasableQty ||
            quantity > currentMaxPurchasableQty;

          return (
            <div className={!hasError ? '' : styles.hasError}>
              <ProductAmountSelector
                className={styles.select}
                variant={variant}
                value={quantity}
                onChange={changeProduct(cartId)}
              />

              {!hasError ? null : <div>{t('quantity-out-of-range')}</div>}
            </div>
          );
        },
      },
      {
        dataIndex: ['cartId'],
        render: (cartId, { type, error }) => (
          <div
            className={type === 'product' ? '' : styles.gift}
            style={{
              color: type === 'product' ? colors[2] : colors[3],
            }}
          >
            {(() => {
              if (type === 'product')
                return (
                  <CartDeleteIcon
                    className={styles.cartDelete}
                    onClick={async () => {
                      updateCart(true);
                      await removeProductFromCart({
                        variables: {
                          search: {
                            productsInfo: {
                              deleteData: cartId,
                            },
                          },
                        },
                      });

                      if (onChange) onChange({ cartId, quantity: 0 });

                      updateCart(false);
                      notification.success({
                        message: t('remove-product-from-cart'),
                      });
                    }}
                  />
                );

              return error === 'GIFT_OUT_OF_STOCK'
                ? t('gift-out-of-stock')
                : t('gift');
            })()}
          </div>
        ),
      },
    ],
    [
      productHasError,
      updateCart,
      t,
      i18n,
      c,
      colors,
      removeProductFromCart,
      onChange,
      changeProduct,
    ],
  );
};
