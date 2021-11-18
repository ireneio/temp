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

export default ({ productHasError, onChange }) => {
  const { t, i18n } = useTranslation('order-product-list');
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const { updateProductInCart, removeProductFromCart } = useContext(
    CartContext,
  );

  const changeProduct = useCallback(
    cartId => async value => {
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

      notification.success({
        message: t('update-product-in-cart'),
      });
    },
    [onChange, t, updateProductInCart],
  );

  return useMemo(
    () => [
      {
        dataIndex: ['coverImage', 'scaledSrc', 'w120'],
        width: 80,
        render: (src, { productId, type, error }) => {
          const disabled =
            type !== 'product' ||
            ['DISCONTINUED', 'NOT_AVAILABLE'].includes(error || '');
          return (
            <Link
              href={`/product/${productId}`}
              disabled={disabled}
              target="_blank"
            >
              <div
                className={`${styles.img} ${disabled ? '' : styles.link} ${
                  error !== 'NOT_AVAILABLE' ? '' : styles.productNotOnline
                }`}
                style={{
                  backgroundImage: `url(${src || placeholderThumbnail})`,
                }}
              />
            </Link>
          );
        },
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
        ) => (
          <div
            className={styles.title}
            style={{
              color: transformColor(colors[3]).alpha(
                error !== 'NOT_AVAILABLE' ? 1 : 0.25,
              ),
            }}
          >
            {title[i18n.language] || title.zh_TW}

            {!specs ? null : (
              <div
                style={{
                  color: transformColor(colors[3]).alpha(
                    error !== 'NOT_AVAILABLE' ? 0.65 : 0.25,
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
                      opacity: error !== 'NOT_AVAILABLE' ? 1 : 0.45,
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
              <>
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
                        DISCONTINUED: t(
                          `DISCONTINUED${!productHasError ? '' : '-warning'}`,
                        ),
                        NOT_AVAILABLE: t(
                          `product-not-online${
                            !productHasError ? '' : '-warning'
                          }`,
                        ),
                        OUT_OF_STOCK: t(
                          `product-sold-out${
                            !productHasError ? '' : '-warning'
                          }`,
                        ),
                      }[error] || ''}
                </div>

                {['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(
                  error,
                ) ? null : (
                  <>
                    <ProductAmountSelector
                      className={`${styles.select} ${styles.mobile}`}
                      variant={variant}
                      value={quantity}
                      onChange={changeProduct(cartId)}
                    />

                    {!error ? null : (
                      <div className={`${styles.hasError} ${styles.mobile}`}>
                        {t(error)}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ),
      },
      {
        dataIndex: ['quantity'],
        render: (quantity, { error, type, cartId, variant }) => {
          if (
            type !== 'product' ||
            ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(error)
          )
            return null;

          return (
            <div className={!error ? '' : styles.hasError}>
              <ProductAmountSelector
                className={styles.select}
                variant={variant}
                value={quantity}
                onChange={changeProduct(cartId)}
              />

              {!error ? null : <div>{t(error)}</div>}
            </div>
          );
        },
      },
      {
        dataIndex: ['cartId'],
        render: (cartId, { type }) => (
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

                      notification.success({
                        message: t('remove-product-from-cart'),
                      });
                    }}
                  />
                );

              return t('gift');
            })()}
          </div>
        ),
      },
    ],
    [
      productHasError,
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
