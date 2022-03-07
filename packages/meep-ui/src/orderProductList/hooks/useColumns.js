import React, { useMemo, useContext, useCallback } from 'react';
import { TagOutlined } from '@ant-design/icons';
import { Tag, notification } from 'antd';
import transformColor from 'color';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { CartDeleteIcon } from '@meepshop/icons';
import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';
import Link from '@meepshop/link';
import ProductAmountSelector from '@meepshop/product-amount-selector';

import styles from './styles/useColumns.less';

export default ({ productHasError, upsertCart }) => {
  const { t } = useTranslation('order-product-list');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);

  const changeProduct = useCallback(
    async value => {
      await upsertCart({
        ...value,
        __typename: 'CartItem',
      });

      notification.success({
        message: t('update-product-in-cart'),
      });
    },
    [t, upsertCart],
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
            type,
            variant,
            productId,
            quantity,
            variantId,
          },
        ) => (
          <>
            {type !== 'upselling_product' ? null : (
              <span
                className={styles.upselling}
                style={{
                  color: colors[0],
                  backgroundColor: colors[3],
                }}
              >
                {t('upselling-product')}
              </span>
            )}

            <div
              className={styles.title}
              style={{
                color: transformColor(colors[3]).alpha(
                  error !== 'NOT_AVAILABLE' ? 1 : 0.25,
                ),
              }}
            >
              {getLanguage(title)}

              {!specs ? null : (
                <div
                  style={{
                    color: transformColor(colors[3]).alpha(
                      error !== 'NOT_AVAILABLE' ? 0.65 : 0.25,
                    ),
                  }}
                >
                  {specs
                    .map(({ title: specTitle }) => getLanguage(specTitle))
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

                      <span>{getLanguage(activityTitle)}</span>
                    </Tag>
                  ))}
                </div>
              )}

              {type === 'gift' ? null : (
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
                        onChange={newQuantity => {
                          changeProduct({
                            productId,
                            quantity: newQuantity - quantity,
                            variantId,
                          });
                        }}
                      />

                      {!error || error === 'EXCEED_LIMIT_PER_ORDER' ? null : (
                        <div className={`${styles.hasError} ${styles.mobile}`}>
                          {t(error)}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        ),
      },
      {
        dataIndex: ['quantity'],
        render: (quantity, { error, type, productId, variantId, variant }) => {
          if (
            type === 'gift' ||
            ['DISCONTINUED', 'NOT_AVAILABLE', 'OUT_OF_STOCK'].includes(error)
          )
            return null;

          return (
            <div className={!error ? '' : styles.hasError}>
              <ProductAmountSelector
                className={styles.select}
                variant={variant}
                value={quantity}
                onChange={newQuantity => {
                  changeProduct({
                    productId,
                    quantity: newQuantity - quantity,
                    variantId,
                  });
                }}
              />

              {!error || error === 'EXCEED_LIMIT_PER_ORDER' ? null : (
                <div>{t(error)}</div>
              )}
            </div>
          );
        },
      },
      {
        dataIndex: ['quantity'],
        render: (quantity, { type, productId, variantId }) => (
          <div
            className={type !== 'gift' ? '' : styles.gift}
            style={{
              color: type !== 'gift' ? colors[2] : colors[3],
            }}
          >
            {(() => {
              if (type !== 'gift')
                return (
                  <CartDeleteIcon
                    className={styles.cartDelete}
                    onClick={async () => {
                      await upsertCart({
                        __typename: 'CartItem',
                        productId,
                        quantity: quantity * -1,
                        variantId,
                      });

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
    [productHasError, t, getLanguage, c, colors, changeProduct, upsertCart],
  );
};
