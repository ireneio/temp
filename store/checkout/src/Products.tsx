// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Table, Skeleton } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import useProductColumns from './hooks/useProductColumns';
import styles from './styles/products.less';

// graphql typescript
import {
  productsFragment as productsFragmentType,
  useProductColumnsFragment as useProductColumnsFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useProductColumnsFragment } from './gqls/useProductColumns';

// typescript definition
interface PropsType {
  loading: boolean;
  computeOrderList: productsFragmentType;
}

// definition
export default React.memo(({ loading, computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const columns = useProductColumns();

  if (loading)
    return (
      <div className={`${styles.root} ${styles.loading}`}>
        {[1, 2, 3].map(key => (
          <Skeleton key={key} avatar={{ shape: 'square', size: 72 }} active />
        ))}
      </div>
    );

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('products')}</div>

      <Table
        rowKey="id"
        className={styles.table}
        dataSource={filter<useProductColumnsFragmentType[]>(
          useProductColumnsFragment,
          computeOrderList?.categories?.[0]?.products,
        ).filter(Boolean)}
        columns={columns}
        showHeader={false}
        pagination={false}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.root} {
                color: ${colors[3]};
              }

              .${styles.title} {
                border-bottom: 1px solid ${colors[5]};
              }

              .${styles.table} .ant-table-tbody > tr > td {
                border-bottom: 1px solid ${colors[5]};
              }

              .${styles.table} .ant-tag {
                color: ${colors[3]};
                background: ${transformColor(colors[3]).alpha(0.1)};
              }

              @media (max-width: ${styles.screenSmMax}) {
                .${styles.table} {
                  border-bottom: 1px solid ${transformColor(colors[5]).alpha(
                    0.5,
                  )};
                }
              }
            `,
        }}
      />
    </div>
  );
});
