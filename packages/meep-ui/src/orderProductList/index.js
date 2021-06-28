import React, { useContext } from 'react';
import { Table } from 'antd';

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
      updateCart,
      onChange,
    }) => {
      const { t } = useTranslation('order-product-list');
      const colors = useContext(ColorsContext);
      const columns = useColumns({ productHasError, updateCart, onChange });

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
              <>
                <Table
                  className={styles.table}
                  dataSource={products}
                  columns={columns}
                  rowKey={({ id }) => id}
                  onRow={({ error }) => ({
                    style:
                      !productHasError || error !== 'PRODUCT_NOT_ONLINE'
                        ? {}
                        : {
                            background: colors[5],
                          },
                  })}
                  showHeader={false}
                  pagination={false}
                />
              </>
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
