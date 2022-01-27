import React, { useContext } from 'react';
import { Table, Skeleton } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import { emptyCart_react as EmptyCart } from '@meepshop/images';

import { enhancer } from 'layout/DecoratorsRoot';

import Total from './Total';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

export default enhancer(
  React.memo(
    ({
      className,
      style,
      children,
      products,
      priceInfo,
      activityInfo,
      isChoosenSipment,
      productHasError,
      loading,
      upsertCart,
    }) => {
      const { t } = useTranslation('order-product-list');
      const colors = useContext(ColorsContext);
      const columns = useColumns({ productHasError, upsertCart });

      if (loading)
        return (
          <div
            className={`${styles.root} ${styles.loading} ${className || ''}`}
            style={style}
          >
            {[1, 2, 3].map(key => (
              <Skeleton
                key={key}
                avatar={{
                  shape: 'square',
                  size: 72,
                }}
                active
              />
            ))}
          </div>
        );

      return (
        <div className={`${styles.root} ${className || ''}`} style={style}>
          <div
            className={`${styles.productList} ${
              products.length !== 0 ? '' : styles.empty
            }`}
          >
            {products.length === 0 ? (
              <>
                <EmptyCart className={styles.emptyCart} />

                <p className={styles.emptyCartText}>{t('empty-cart')}</p>
              </>
            ) : (
              <Table
                className={styles.table}
                dataSource={products}
                columns={columns}
                onRow={({ error }) => ({
                  style:
                    productHasError &&
                    ['NOT_AVAILABLE', 'DISCONTINUED'].includes(error || '')
                      ? {
                          background: colors[5],
                        }
                      : {},
                })}
                showHeader={false}
                pagination={false}
                rowKey="id"
              />
            )}
          </div>

          <Total
            {...priceInfo}
            isChoosenSipment={isChoosenSipment}
            activityInfo={activityInfo || []}
          >
            {children}
          </Total>
        </div>
      );
    },
  ),
);
