// typescript import
import { ColumnProps } from 'antd/lib/table';

import { ValuesType } from './useInitialValue';

// import
import React, { useMemo, useContext } from 'react';
import { Form } from 'antd';
import { TagOutlined, CloseOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { useCart } from '@meepshop/hooks';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';
import Switch from '@meepshop/switch';
import Thumbnail from '@meepshop/thumbnail';
import filter from '@meepshop/utils/lib/filter';

import ProductAmountSelector from '../ProductAmountSelector';
import styles from '../styles/useProductsColumns.less';

// graphql typescript
import {
  useProductsColumnsUserFragment as useProductsColumnsUserFragmentType,
  useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';
import {
  productAmountSelectorUserFragment,
  productAmountSelectorLineItemFragment,
} from '../gqls/productAmountSelector';

// typescript definition
interface ReturnType {
  columns: ColumnProps<useProductsColumnsLineItemFragmentType>[];
  styles: string;
}

interface PropsType {
  viewer: useProductsColumnsUserFragmentType | null;
  requireDesignatedShipment: boolean;
}

// definition
const { Item: FormItem } = Form;

export default ({
  viewer,
  requireDesignatedShipment,
}: PropsType): ReturnType => {
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
          // eslint-disable-next-line no-nested-ternary
          width: isMobile ? (requireDesignatedShipment ? 84 : 102) : 124,
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
                  size={100}
                  mobileSize={requireDesignatedShipment ? 72 : 90}
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
            lineItem,
          ) => {
            const {
              productId,
              specs,
              type,
              status,
              discountAllocations,
              unitPrice,
              quantity,
            } = lineItem;
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
                {!isMobile ? null : (
                  <div className={styles.mobile}>
                    {type === 'GIFT' ? (
                      <div className={styles.price}>{t('gift')}</div>
                    ) : (
                      <>
                        {[
                          'DISCONTINUED',
                          'OUT_OF_STOCK',
                          'NOT_AVAILABLE',
                        ].includes(status) ? null : (
                          <div className={styles.price}>
                            {c((unitPrice || 0) * (quantity || 0))}
                          </div>
                        )}

                        <ProductAmountSelector
                          viewer={filter(
                            productAmountSelectorUserFragment,
                            viewer,
                          )}
                          lineItem={filter(
                            productAmountSelectorLineItemFragment,
                            lineItem,
                          )}
                        />
                      </>
                    )}
                  </div>
                )}
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

            if (
              ['DISCONTINUED', 'OUT_OF_STOCK', 'NOT_AVAILABLE'].includes(status)
            )
              return null;

            return c(unitPrice || 0);
          },
        },
        {
          title: t('quantity'),
          dataIndex: ['quantity'],
          width: '15%',
          align: 'center',
          responsive: ['md'],
          render: (_, lineItem) => {
            if (lineItem.type === 'GIFT') return null;

            return (
              <ProductAmountSelector
                viewer={filter(productAmountSelectorUserFragment, viewer)}
                lineItem={filter(
                  productAmountSelectorLineItemFragment,
                  lineItem,
                )}
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
            _totalPrice: number,
            { type, unitPrice, quantity, status },
          ) =>
            type === 'GIFT' ||
            ['DISCONTINUED', 'OUT_OF_STOCK', 'NOT_AVAILABLE'].includes(status)
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
              <FormItem dependencies={['products']} noStyle>
                {({ setFieldsValue, getFieldValue }) => {
                  const products: ValuesType['products'] = getFieldValue([
                    'products',
                  ]);

                  return (
                    <CloseOutlined
                      className={styles.delete}
                      onClick={() => {
                        upsertCart({
                          __typename: 'CartItem' as const,
                          productId,
                          quantity: (quantity || 0) * -1,
                          variantId,
                        });
                        setFieldsValue({
                          products: products.filter(
                            product => product.variantId !== variantId,
                          ),
                        });
                      }}
                    />
                  );
                }}
              </FormItem>
            ),
        },
      ],
      styles: `
        .${styles.img} {
          box-shadow: 0 1px 3px 0 ${transformColor(colors[3]).alpha(
            0.08,
          )} !important;
          outline: 1px solid ${transformColor(colors[3])
            .alpha(0.1)
            .toString()} !important;
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
    [
      isMobile,
      t,
      colors,
      requireDesignatedShipment,
      getLanguage,
      c,
      viewer,
      upsertCart,
    ],
  );
};
